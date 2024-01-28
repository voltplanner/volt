import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class SignInInput {
    @Field()
    @IsEmail()
    email: string

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
    adminId: string

    @Field()
    expiresAt: number
}
