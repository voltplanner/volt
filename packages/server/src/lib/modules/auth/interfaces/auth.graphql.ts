import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

import {
    OrderByInput,
    PaginatedResponseType,
} from '../../shared/graphql/shared.graphql'
import { AuthUserRoleEnum, AuthUserStatusEnum } from '../../shared/prisma'

registerEnumType(AuthUserRoleEnum, {
    name: 'AuthUserRoleEnum',
})

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

    @Field(() => AuthUserRoleEnum, { nullable: true })
    role?: AuthUserRoleEnum

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

@ObjectType({ isAbstract: true })
export class User {
    @Field()
    id: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field()
    email: string

    @Field(() => AuthUserRoleEnum)
    role: AuthUserRoleEnum

    @Field(() => AuthUserStatusEnum)
    status: AuthUserStatusEnum

    @Field()
    createdAt: Date

    @Field({ nullable: true })
    deletedAt?: Date
}

@ObjectType()
export class PaginatedUsers extends PaginatedResponseType(User) {}

@InputType()
export class CreateUserInput {
    @Field()
    email: string

    @Field()
    firstname: string

    @Field()
    lastname: string

    @Field(() => AuthUserRoleEnum)
    role: AuthUserRoleEnum
}
