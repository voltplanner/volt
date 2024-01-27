import { Body, Controller, Post } from '@nestjs/common'

import { SignInDTO } from '../interfaces/auth.dtos'
import { SignInResponse } from '../interfaces/auth.interfaces'
import { AuthUserService } from '../services/auth-user.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthUserService) {}

    @Post('signIn')
    async signIn(@Body() body: SignInDTO): Promise<SignInResponse> {
        return await this.userService.signIn(body)
    }
}
