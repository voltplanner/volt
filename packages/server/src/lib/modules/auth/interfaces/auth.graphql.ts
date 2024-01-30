import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

import {
    OrderByInput,
    PaginatedResponseType,
} from '../../shared/graphql/shared.graphql'
import { AuthUserStatusEnum } from '../../shared/prisma'

registerEnumType(AuthUserStatusEnum, {
    name: 'AuthUserStatusEnum',
})

@InputType()
export class SignInInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}

@InputType()
export class CompleteSignInInput {
    @Field()
    userId: string

    @Field()
    code: string

    @Field()
    password: string
}

@ObjectType()
export class AuthorizationResponse {
    @Field()
    refreshToken: string

    @Field()
    accessToken: string

    @Field()
    userId: string

    @Field()
    expiresAt: number
}

@InputType()
export class GetUsersFilterInput {
    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    firstname?: string

    @Field({ nullable: true })
    lastname?: string

    @Field({ nullable: true })
    role?: string

    @Field(() => AuthUserStatusEnum, { nullable: true })
    status?: AuthUserStatusEnum
}

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    userId: string

    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    firstname?: string

    @Field({ nullable: true })
    lastname?: string

    @Field({ nullable: true })
    password?: string

    @Field({ nullable: true })
    role?: string

    @Field(() => AuthUserStatusEnum, { nullable: true })
    status?: AuthUserStatusEnum
}

@InputType()
export class GetUsersInput {
    @Field({ nullable: true })
    curPage?: number

    @Field({ nullable: true })
    perPage?: number

    @Field(() => OrderByInput, { nullable: true })
    orderBy?: OrderByInput

    @Field(() => GetUsersFilterInput, { nullable: true })
    filter?: GetUsersFilterInput
}

@InputType()
export class GetRolesInput {
    @Field({ nullable: true })
    name?: string
}

@InputType()
export class PermissionInput {
    @Field()
    methodId: string

    @Field()
    allow: boolean
}

@InputType()
export class ChangePermissionsInput {
    @Field()
    roleId: string

    @Field(() => [PermissionInput])
    permissions: PermissionInput[]
}

@InputType()
export class GetAvailableMethodsInput {
    @Field()
    name: string

    @Field(() => [String], { nullable: true })
    groups?: string[]
}

@ObjectType()
export class RoleType {
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field()
    editable: boolean

    @Field()
    superuser: boolean
}

@ObjectType()
export class MethodsType {
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field()
    group: string

    @Field()
    description: string

    @Field()
    allowed: boolean
}

@ObjectType()
export class AvailableMethodsType {
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field()
    editable: boolean

    @Field()
    superuser: boolean

    @Field(() => [MethodsType])
    methods: MethodsType[]
}

@ObjectType()
export class UserType {
    @Field()
    id: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    email: string

    @Field(() => RoleType)
    role: RoleType

    @Field(() => AuthUserStatusEnum)
    status: AuthUserStatusEnum

    @Field()
    createdAt: Date

    @Field({ nullable: true })
    deletedAt?: Date
}

@ObjectType()
export class PaginatedUsers extends PaginatedResponseType(UserType) {}

@InputType()
export class CreateUserInput {
    @Field()
    email: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    roleName: string
}
