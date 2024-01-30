import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

import { PrismaService } from '../prisma'

@Injectable()
export class ACLGuard extends AuthGuard('jwt') {
    private logger = new Logger()

    constructor(
        private readonly jwt: JwtService,
        private readonly prisma: PrismaService,
    ) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        try {
            const ctx = GqlExecutionContext.create(context)
            const graphqlOperationName = ctx.getContext().req.body.operationName

            if (!graphqlOperationName) {
                throw new UnprocessableEntityException(
                    `GraphQL operation name not found. Try to 'query operationName { ... }'`,
                )
            }

            const authorizationToken =
                ctx.getContext().req.headers['authorization']

            const decodedToken = this.jwt.decode(
                authorizationToken.split(' ')[1],
            )

            if (!decodedToken || !decodedToken?.role) {
                throw new UnauthorizedException('Role not found')
            }

            const role = await this.prisma.authRole.findUnique({
                where: {
                    name: decodedToken.role,
                    user: {
                        some: {
                            id: decodedToken.sub,
                        },
                    },
                },
                select: {
                    id: true,
                    superuser: true,
                },
            })

            if (role.superuser) {
                return ctx.getContext().req
            }

            const method = await this.prisma.authMethod.findUnique({
                where: {
                    name: graphqlOperationName,
                },
                select: {
                    id: true,
                },
            })

            if (!method) {
                throw new UnprocessableEntityException(
                    `This graphql method not found in method list. Try to 'query operationName { ... }'`,
                )
            }

            const permission = await this.prisma.authRolePermission.findUnique({
                where: {
                    roleId_methodId: {
                        roleId: role.id,
                        methodId: method.id,
                    },
                },
                select: {
                    allowed: true,
                },
            })

            if (!permission || (permission && !permission.allowed)) {
                throw new ForbiddenException('Forbidden')
            }

            return ctx.getContext().req
        } catch (error) {
            // TODO: add 401 error skip
            this.logger.error(error)
            throw error
        }
    }
}
