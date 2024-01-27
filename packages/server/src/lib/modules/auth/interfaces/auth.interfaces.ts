import { RoleEnum } from '../../shared/prisma'

export interface RefreshTokenPayload {
    jti: string
    sub: string
}

export interface User {
    id: string
    email: string
    firstname: string
    lastname: string
    role: RoleEnum
    createdAt: Date
    deletedAt: Date
}

export type CreateUser = {
    email: string
    firstname: string
    lastname: string
    password: string
    role: RoleEnum
}

export type UpdateUser = {
    email: string
    firstname: string
    lastname: string
    password: string
    role: RoleEnum
}

export interface FindFilter {
    skip?: number
    take?: number
    filter?: {
        email?: string
        firstname?: string
        lastname?: string
        role?: RoleEnum
    }
}

export interface SignInPayload {
    email: string
    password: string
}

export interface SignInResponse {
    refreshToken: string
    accessToken: string
    adminId: string
    expiresAt: number
}
