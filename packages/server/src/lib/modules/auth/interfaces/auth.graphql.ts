import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

import { AuthUserRoleEnum } from '../../shared/prisma'

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

@ObjectType()
export class User {
    @Field()
    id: string

    @Field()
    firstname: string

    @Field()
    lastname: string
}

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

registerEnumType(AuthUserRoleEnum, {
    name: 'AuthUserRoleEnum',
})
