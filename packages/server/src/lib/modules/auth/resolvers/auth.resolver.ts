import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthorizationResponse, SignInInput } from '../interfaces/auth.graphql'
import { AuthUserService } from '../services/auth-user.service'

@Resolver()
export class AuthResolver {
    constructor(private readonly userService: AuthUserService) {}

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
}
