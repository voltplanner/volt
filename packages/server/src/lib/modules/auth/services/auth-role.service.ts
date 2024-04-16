import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Inject, Injectable, Logger } from '@nestjs/common'

import {
    ACCESS_CONTROL_METAKEY,
    AccessControlPayload,
} from '../../../shared/decorators'
import { PaginatedResponse } from '../../../shared/interfaces/shared.interfaces'
import { Prisma, PrismaService } from '../../../shared/prisma'
import { parseMetaArgs } from '../../../shared/utils'
import { AUTH_CONFIG, AuthConfig } from '../configs/auth-module.config'
import {
    ChangePermissionPayload,
    CreateRole,
    GetMyRole,
    GetRoles,
    GetRolesResponse,
    UpdateRole,
} from '../interfaces/auth.interfaces'

@Injectable()
export class AuthRoleService {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly prisma: PrismaService,
        private readonly discovery: DiscoveryService,
    ) {}

    async createRole(data: CreateRole) {
        const allMethods = await this.prisma.authMethod.findMany({
            select: {
                id: true,
            },
        })

        const role = await this.prisma.authRole.create({
            data: {
                name: data.name.toLowerCase(),
                editable: false,
                superuser: false,
                permissions: {
                    createMany: {
                        data: allMethods.map((method) => ({
                            allowed: false,
                            methodId: method.id,
                            editable: true,
                        })),
                    },
                },
            },
            include: {
                permissions: {
                    include: {
                        method: true,
                    },
                },
            },
        })

        return {
            id: role.id,
            name: role.name,
            superuser: role.superuser,
            editable: role.editable,
            methods: role.permissions.map((u) => ({
                id: u.method.id,
                name: u.method.name,
                description: u.method.description,
                group: u.method.group,
                allowed: u.allowed,
                editable: u.editable,
            })),
        }
    }

    async updateRole(data: UpdateRole) {
        const { roleId, ...updateData } = data

        const role = await this.prisma.authRole.update({
            where: {
                id: roleId,
                editable: false,
            },
            data: {
                ...updateData,
                name: updateData.name.toLowerCase(),
            },
        })

        return role
    }

    async deleteRole(roleId: string) {
        const role = await this.prisma.authRole.delete({
            where: {
                id: roleId,
            },
        })

        return role
    }

    async getRole(data: GetMyRole) {
        const role = await this.prisma.authRole.findFirst({
            where: {
                user: {
                    some: {
                        id: data.userId,
                    },
                },
            },
            include: {
                permissions: {
                    include: {
                        method: true,
                    },
                },
            },
        })

        return {
            id: role.id,
            name: role.name,
            superuser: role.superuser,
            editable: role.editable,
            methods: role.permissions.map((u) => ({
                id: u.method.id,
                name: u.method.name,
                description: u.method.description,
                group: u.method.group,
                allowed: u.allowed,
                editable: u.editable,
            })),
        }
    }

    async getRoles(
        data: GetRoles,
    ): Promise<PaginatedResponse<GetRolesResponse>> {
        const { filter } = data

        const { skip, take, curPage, perPage } = parseMetaArgs({
            curPage: data.curPage,
            perPage: data.perPage,
            defaults: {
                curPage: 1,
                perPage: 20,
            },
        })

        const queryOptions: {
            where?: Prisma.AuthRoleWhereInput
            orderBy?: Prisma.AuthRoleOrderByWithRelationInput
        } = {
            where: {
                name: undefined,
            },
            orderBy: undefined,
        }

        if (filter?.name) {
            queryOptions.where['name'] = { contains: filter.name }
        }

        const roles = await this.prisma.authRole.findMany({
            ...queryOptions,
            skip,
            take,
            include: {
                permissions: {
                    include: {
                        method: true,
                    },
                },
            },
        })

        const total = await this.prisma.authRole.count({
            ...queryOptions,
        })

        return {
            meta: {
                curPage,
                perPage,
                total,
            },
            data: roles.map((v) => ({
                id: v.id,
                name: v.name,
                superuser: v.superuser,
                editable: v.editable,
                methods: v.permissions.map((u) => ({
                    id: u.method.id,
                    name: u.method.name,
                    description: u.method.description,
                    group: u.method.group,
                    allowed: u.allowed,
                    editable: u.editable,
                })),
            })),
        }
    }

    async changePermissions(data: ChangePermissionPayload) {
        const { roleId, permissions } = data

        for (const permission of permissions) {
            await this.prisma.authRolePermission.update({
                where: {
                    roleId_methodId: {
                        roleId,
                        methodId: permission.methodId,
                    },
                    editable: true,
                },
                data: {
                    allowed: permission.allow,
                },
            })
        }
    }

    async _createDefaultRole() {
        const isRolesInitialized = await this.prisma.authSettings.findFirst()

        if (
            isRolesInitialized ||
            (isRolesInitialized &&
                isRolesInitialized.defaultRolesInitialized === true)
        ) {
            return
        }

        await this.prisma.authRole.upsert({
            where: {
                name: 'owner',
            },
            create: {
                name: 'owner',
                editable: false,
                superuser: true,
            },
            update: {},
        })

        await this.prisma.authRole.upsert({
            where: {
                name: 'admin',
            },
            create: {
                name: 'admin',
                editable: true,
                superuser: false,
            },
            update: {},
        })

        await this.prisma.authRole.upsert({
            where: {
                name: 'member',
            },
            create: {
                name: 'member',
                editable: true,
                superuser: false,
            },
            update: {},
        })

        await this.prisma.authSettings.upsert({
            where: {
                id: 0,
            },
            create: {
                id: 0,
                defaultRolesInitialized: true,
            },
            update: {
                defaultRolesInitialized: true,
            },
        })
    }

    async _updateMethods() {
        const graphqlMethods =
            await this.discovery.providerMethodsWithMetaAtKey<AccessControlPayload>(
                ACCESS_CONTROL_METAKEY,
            )

        const parsedGraphqlMethods = graphqlMethods.map((v) => {
            return {
                name: v.discoveredMethod.methodName,
                description: v.meta.description,
                group: v.meta.group,
                editable: v.meta.editable,
            }
        })

        const methodsCreated = await this.prisma.authMethod.createMany({
            data: parsedGraphqlMethods,
            skipDuplicates: true,
        })

        if (methodsCreated.count) {
            this.logger.log(`Auth methods created: ${methodsCreated.count}`)
        }

        const defaultAllowPermissions = this.config.defaultAllowPermissions

        const roles = await this.prisma.authRole.findMany({
            select: {
                id: true,
                name: true,
                superuser: true,
            },
        })

        const methods = await this.prisma.authMethod.findMany({
            select: {
                id: true,
                name: true,
            },
        })

        const permissionsToCreateForRole: {
            roleId: string
            methodId: string
            allowed: boolean
            editable?: boolean
        }[] = []

        for (const role of roles) {
            const rolePermissions = defaultAllowPermissions.filter(
                (v) => v.roleName === role.name,
            )

            for (const method of parsedGraphqlMethods) {
                const { id: methodId } = methods.find(
                    (v) => v.name === method.name,
                )

                if (role.superuser) {
                    permissionsToCreateForRole.push({
                        roleId: role.id,
                        methodId: methodId,
                        allowed: true,
                        editable: false,
                    })
                    continue
                }

                const rolePermission = rolePermissions.find(
                    (v) => v.methodName === method.name,
                )

                if (rolePermission !== undefined) {
                    permissionsToCreateForRole.push({
                        roleId: role.id,
                        methodId: methodId,
                        allowed: true,
                        editable: rolePermission.editable,
                    })
                } else {
                    permissionsToCreateForRole.push({
                        roleId: role.id,
                        methodId: methodId,
                        allowed: false,
                    })
                }
            }
        }

        const permissionsCreated =
            await this.prisma.authRolePermission.createMany({
                data: permissionsToCreateForRole,
                skipDuplicates: true,
            })

        if (permissionsCreated.count) {
            this.logger.log(
                `Auth permissions created: ${permissionsCreated.count}`,
            )
        }
    }
}
