import { Body, Controller, Post } from '@nestjs/common'

import { SignInResponse } from '../services/auth.interfaces'
import { AuthUserService } from '../services/auth-user.service'
import { SignInDTO } from './auth.dtos'

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthUserService) {}

    @Post('signIn')
    async signIn(@Body() body: SignInDTO): Promise<SignInResponse> {
        return await this.userService.signIn(body)
    }
}
