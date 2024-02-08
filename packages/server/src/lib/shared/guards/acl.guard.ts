import {
    BadRequestException,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

import { environment } from '../../../environments/environment'
import { CurrentUserPayload } from '../interfaces/shared.interfaces'
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
            const req = ctx.getContext().req
            const graphqlOperationName = req.body.operationName

            if (!graphqlOperationName) {
                throw new UnauthorizedException(
                    `GraphQL operation name not found. Try to 'query operationName { ... }'`,
                )
            }

            const authorizationToken = this.extractTokenFromHeader(req)

            let decodedToken = undefined

            try {
                decodedToken = await this.jwt.verifyAsync<{
                    sub: string
                    role: string
                }>(authorizationToken, {
                    secret: environment.jwt.secret,
                })
            } catch (error) {
                throw new UnauthorizedException()
            }

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

            req['user'] = {
                role: decodedToken.role,
                userId: decodedToken.sub,
            } as CurrentUserPayload

            if (role.superuser) {
                return req
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
                throw new BadRequestException(
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

            return req
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            }

            if (error instanceof ForbiddenException) {
                throw error
            }

            if (error instanceof BadRequestException) {
                throw error
            }

            this.logger.error(error)
            throw error
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization'].split(' ') ?? []

        if (!token) {
            throw new UnauthorizedException()
        }

        return type.toLowerCase() === 'bearer' ? token : undefined
    }
}
