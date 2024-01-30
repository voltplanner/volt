import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AccessControl } from '../../shared/decorators'
import { ACLGuard } from '../../shared/guards/acl.guard'
import {
    AuthorizationResponse,
    AvailableMethodsType,
    ChangePermissionsInput,
    CompleteSignInInput,
    CreateUserInput,
    GetAvailableMethodsInput,
    GetRolesInput,
    GetUsersInput,
    PaginatedUsers,
    RoleType,
    SignInInput,
    UpdateUserInput,
    UserType,
} from '../interfaces/auth.graphql'
import { AuthACLService } from '../services/auth-acl.service'
import { AuthAdminService } from '../services/auth-admin.service'
import { AuthUserService } from '../services/auth-user.service'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: AuthUserService,
        private readonly adminService: AuthAdminService,
        private readonly aclService: AuthACLService,
    ) {}

    @UseGuards(ACLGuard)
    @Query(() => PaginatedUsers)
    @AccessControl({ group: 'users', description: 'View users' })
    async getUsers(
        @Args('input') input: GetUsersInput,
    ): Promise<PaginatedUsers> {
        return await this.adminService.getUsers(input)
    }

    @UseGuards(ACLGuard)
    @Query(() => AvailableMethodsType)
    @AccessControl({ group: 'roles', description: 'View permissions' })
    async getAvailableMethods(
        @Args('input') input: GetAvailableMethodsInput,
    ): Promise<AvailableMethodsType> {
        return await this.aclService.getAvailableMethods(input)
    }

    @UseGuards(ACLGuard)
    @Query(() => [RoleType])
    @AccessControl({ group: 'roles', description: 'View roles' })
    async getRoles(@Args('input') input: GetRolesInput): Promise<RoleType[]> {
        return await this.aclService.getRoles(input)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({ group: 'roles', description: 'Change permissions' })
    async changePermissions(
        @Args('input') input: ChangePermissionsInput,
    ): Promise<boolean> {
        await this.aclService.changePermissions(input)

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => UserType)
    @AccessControl({ group: 'users', description: 'Update users' })
    async updateUser(@Args('input') input: UpdateUserInput): Promise<UserType> {
        return await this.adminService.updateUser(input)
    }

    @Mutation(() => AuthorizationResponse)
    async signIn(
        @Args('input') input: SignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.userService.signIn(input)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => UserType)
    @AccessControl({ group: 'users', description: 'Invite new users' })
    async createUser(@Args('input') input: CreateUserInput): Promise<UserType> {
        return await this.adminService.createUser(input)
    }

    @Mutation(() => AuthorizationResponse)
    async completeSignIn(
        @Args('input') input: CompleteSignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.userService.completeSignIn(input)
    }
}
