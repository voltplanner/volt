import { AuthUserRoleEnum } from '../../shared/prisma'

export interface RefreshTokenPayload {
    jti: string
    sub: string
}

export interface AccessTokenPayload {
    role: AuthUserRoleEnum
    sub: string
}

export interface User {
    id: string
    email: string
    firstname: string
    lastname: string
    role: AuthUserRoleEnum
    createdAt: Date
    deletedAt: Date
}

export type CreateUserWithPassword = {
    email: string
    firstname: string
    lastname: string
    password: string
    role: AuthUserRoleEnum
}

export type CreateUser = {
    email: string
    firstname: string
    lastname: string
    role: AuthUserRoleEnum
}

export interface CompleteSignIn {
    userId: string
    code: string
    password: string
}

export type DeleteUser = {
    userId: string
}

export type UpdateUser = {
    email: string
    firstname: string
    lastname: string
    password: string
    role: AuthUserRoleEnum
}

export interface FindFilter {
    skip?: number
    take?: number
    filter?: {
        email?: string
        firstname?: string
        lastname?: string
        role?: AuthUserRoleEnum
    }
}

export interface SignInPayload {
    email: string
    password: string
}

export interface SignInResponse {
    refreshToken: string
    accessToken: string
    userId: string
    expiresAt: number
}
