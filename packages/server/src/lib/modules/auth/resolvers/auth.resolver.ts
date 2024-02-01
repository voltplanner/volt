import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AccessControl } from '../../shared/decorators'
import { CurrentUser } from '../../shared/decorators/current-user.decorator'
import { ACLGuard } from '../../shared/guards/acl.guard'
import { CurrentUserPayload } from '../../shared/interfaces/shared.interfaces'
import {
    AuthorizationResponse,
    ChangePermissionsInput,
    CompleteSignInInput,
    CreateUserInput,
    DeleteRoleInput,
    DeleteUserInput,
    GetRolesInput,
    GetUsersInput,
    PaginatedUsers,
    RefreshTokenInput,
    RoleType,
    SignInInput,
    UpdateRoleInput,
    UpdateUserInput,
    UserType,
} from '../interfaces/auth.graphql'
import { AuthAuthService } from '../services/auth-auth.service'
import { AuthRoleService } from '../services/auth-role.service'
import { AuthUserService } from '../services/auth-user.service'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthAuthService,
        private readonly userService: AuthUserService,
        private readonly roleService: AuthRoleService,
    ) {}

    @UseGuards(ACLGuard)
    @Query(() => PaginatedUsers)
    @AccessControl({ group: 'users', description: 'View users' })
    async getUsers(
        @Args('input') input: GetUsersInput,
    ): Promise<PaginatedUsers> {
        return await this.userService.getUsers(input)
    }

    @UseGuards(ACLGuard)
    @Query(() => [RoleType])
    @AccessControl({ group: 'roles', description: 'View roles' })
    async getRoles(@Args('input') input: GetRolesInput): Promise<RoleType[]> {
        return await this.roleService.getRoles(input)
    }

    @UseGuards(ACLGuard)
    @Query(() => RoleType)
    @AccessControl({ group: 'roles', description: 'View user role' })
    async getMyRole(
        @Args('input') input: GetRolesInput,
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<RoleType> {
        return await this.roleService.getMyRole({
            ...input,
            userId: user.userId,
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'roles', description: 'Update roles' })
    async updateRole(@Args('input') input: UpdateRoleInput): Promise<boolean> {
        await this.roleService.updateRole(input)

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'roles', description: 'Delete roles' })
    async deleteRole(@Args('input') input: DeleteRoleInput): Promise<boolean> {
        await this.roleService.deleteRole(input.roleId)

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'roles', description: 'Change permissions' })
    async changePermissions(
        @Args('input') input: ChangePermissionsInput,
    ): Promise<boolean> {
        await this.roleService.changePermissions(input)

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'users', description: 'Update users' })
    async updateUser(@Args('input') input: UpdateUserInput): Promise<boolean> {
        await this.userService.updateUser(input)

        return true
    }

    @Mutation(() => AuthorizationResponse)
    async signIn(
        @Args('input') input: SignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.authService.signIn(input)
    }

    @Mutation(() => AuthorizationResponse)
    async refreshToken(
        @Args('input') input: RefreshTokenInput,
    ): Promise<AuthorizationResponse> {
        return await this.authService.refreshToken(input.refreshToken)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => UserType)
    @AccessControl({ group: 'users', description: 'Invite new users' })
    async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
        return await this.userService.createUser(input)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'users', description: 'Delete users' })
    async deleteUser(@Args('input') input: DeleteUserInput): Promise<boolean> {
        await this.userService.deleteUser(input.userId)

        return true
    }

    @Mutation(() => AuthorizationResponse)
    async completeSignIn(
        @Args('input') input: CompleteSignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.authService.completeSignIn(input)
    }
}
