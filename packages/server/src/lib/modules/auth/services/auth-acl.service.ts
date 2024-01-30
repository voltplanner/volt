import { DiscoveryService } from '@golevelup/nestjs-discovery'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import _ from 'lodash'

import {
    ACCESS_CONTROL_METAKEY,
    AccessControlPayload,
} from '../../shared/decorators'
import { PrismaService } from '../../shared/prisma'
import { AUTH_CONFIG, AuthConfig } from '../auth.config'
import {
    ChangePermissionPayload,
    CreateRole,
    GetAvailableMethods,
    GetRoles,
    UpdateRole,
} from '../interfaces/auth.interfaces'

@Injectable()
export class AuthACLService {
    constructor(
        @Inject(AUTH_CONFIG)
        private readonly config: AuthConfig,
        private readonly prisma: PrismaService,
        private readonly discovery: DiscoveryService,
    ) {}

    async createRole(data: CreateRole) {
        const role = await this.prisma.authRole.create({
            data: {
                name: data.name.toLowerCase(),
                editable: false,
                superuser: false,
            },
        })

        return role
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

    async getRoles(data: GetRoles) {
        const roles = await this.prisma.authRole.findMany({
            where: {
                name: {
                    contains: data.name,
                },
            },
        })

        return roles
    }

    async getRoleAvailableMethods(data: GetAvailableMethods) {
        const { name, groups } = data

        const role = await this.prisma.authRole.findUnique({
            where: {
                name,
            },
        })

        if (!role) {
            throw new NotFoundException('Role not found')
        }

        const allMethods = await this.prisma.authMethod.findMany({})

        const methods = await this.prisma.authMethod.findMany({
            where: {
                group: groups
                    ? {
                          in: groups,
                      }
                    : undefined,
                permissions: {
                    some: {
                        role: {
                            name,
                        },
                    },
                },
            },
            include: {
                permissions: {
                    select: {
                        allowed: true,
                    },
                },
            },
        })

        const parsedAllMethods = allMethods.map((v) => ({
            ...v,
            permissions: [],
        }))

        return {
            id: role.id,
            name: role.name,
            superuser: role.superuser,
            editable: role.editable,
            methods: _.merge(parsedAllMethods, methods).map((v) => {
                let allowed = false

                if (v.permissions.length > 0) {
                    allowed = v.permissions[0].allowed
                }

                if (role.superuser) {
                    allowed = true
                }

                return {
                    id: v.id,
                    name: v.name,
                    group: v.group,
                    description: v.description,
                    allowed,
                }
            }),
        }
    }

    async changePermissions(data: ChangePermissionPayload) {
        const { roleId, permissions } = data

        for (const permission of permissions) {
            await this.prisma.authRolePermission.upsert({
                where: {
                    roleId_methodId: {
                        roleId,
                        methodId: permission.methodId,
                    },
                },
                create: {
                    roleId,
                    methodId: permission.methodId,
                    allowed: permission.allow,
                },
                update: {
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

        await this.prisma.authMethod.createMany({
            data: graphqlMethods.map((v) => {
                return {
                    name: v.discoveredMethod.methodName,
                    description: v.meta.description,
                    group: v.meta.group,
                }
            }),
            skipDuplicates: true,
        })
    }

    async _createDefaultPermissions() {
        const permissions = this.config.acl.defaultPermissions

        for (const permission of permissions) {
            const { allow, methodName, roleName } = permission

            const method = await this.prisma.authMethod.findUnique({
                where: {
                    name: methodName,
                },
                select: {
                    id: true,
                },
            })

            const role = await this.prisma.authRole.findUnique({
                where: {
                    name: methodName,
                },
                select: {
                    id: true,
                },
            })

            if (!role) {
                continue
            }

            const data = {
                method: {
                    connect: {
                        name: methodName,
                    },
                },
                role: {
                    connect: {
                        name: roleName,
                    },
                },
                allowed: allow,
            }

            await this.prisma.authRolePermission.upsert({
                where: {
                    roleId_methodId: {
                        roleId: role.id,
                        methodId: method.id,
                    },
                },
                create: data,
                update: data,
            })
        }
    }
}
