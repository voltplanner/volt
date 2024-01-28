import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { OwnerGuard } from '../../shared/guards/owner.guard'
import {
    AuthorizationResponse,
    CompleteSignInInput,
    CreateUserInput,
    SignInInput,
    User,
} from '../interfaces/auth.graphql'
import { AuthAdminService } from '../services/auth-admin.service'
import { AuthUserService } from '../services/auth-user.service'

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: AuthUserService,
        private readonly adminService: AuthAdminService,
    ) {}

    @Query(() => String)
    async hi() {
        return 'string'
    }

    @Mutation(() => AuthorizationResponse)
    async signIn(
        @Args('input') input: SignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.userService.signIn(input)
    }

    @UseGuards(OwnerGuard)
    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput): Promise<User> {
        return await this.adminService.createUser(input)
    }

    @Mutation(() => AuthorizationResponse)
    async completeSignIn(
        @Args('input') input: CompleteSignInInput,
    ): Promise<AuthorizationResponse> {
        return await this.userService.completeSignIn(input)
    }
}
