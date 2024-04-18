import { OrderEnum } from '../../../shared/interfaces/shared.interfaces'
import { AuthUserStatusEnum } from '../../../shared/prisma'

export interface RefreshTokenPayload {
    jti: string
    sub: string
}

export interface AccessTokenPayload {
    role: string
    sub: string
}

export interface GetUsers {
    curPage?: number
    perPage?: number
    orderBy?: {
        field: string
        order: OrderEnum
    }
    filter?: {
        ids?: string[]
        email?: string
        firstname?: string
        lastname?: string
        role?: string
        status?: AuthUserStatusEnum
    }
}

export type CreateUserWithPassword = {
    email: string
    firstname: string
    lastname: string
    password: string
    role: string
}

export interface CreateUser {
    email: string
    firstname: string
    lastname: string
    roleName: string
}

export interface GetMyRole {
    userId: string
}

export interface GetRoles {
    curPage?: number
    perPage?: number
    filter?: {
        name?: string
    }
}

export interface GetRolesResponse {
    id: string
    name: string
    superuser: boolean
    editable: boolean
    methods: {
        id: string
        name: string
        description: string
        group: string
        allowed: boolean
        editable: boolean
    }[]
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
    userId: string
    email?: string
    firstname?: string
    lastname?: string
    password?: string
    role?: string
    status?: AuthUserStatusEnum
}

export interface ChangeUserRolePayload {
    userId: string
    roleName: string
}

export interface FindFilter {
    skip?: number
    take?: number
    filter?: {
        email?: string
        firstname?: string
        lastname?: string
        role?: string
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

export interface Role {
    id: string
    name: string
    superuser: boolean
    editable: boolean
    methods: {
        id: string
        name: string
        description: string
        group: string
        allowed: boolean
    }[]
}

export interface CreateRole {
    name: string
}

export interface UpdateRole {
    roleId: string
    name?: string
    superuser?: boolean
    editable?: boolean
}

export interface ChangePermissionPayload {
    roleId: string
    permissions: {
        methodId: string
        allow: boolean
    }[]
}
