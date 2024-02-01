import { Injectable } from '@nestjs/common'

import { AuthRoleService } from './auth-role.service'
import { AuthUserService } from './auth-user.service'

@Injectable()
export class AuthBootstrapService {
    constructor(
        private readonly user: AuthUserService,
        private readonly role: AuthRoleService,
    ) {}

    async onApplicationBootstrap() {
        await this.role._createDefaultRole()
        await this.role._updateMethods()
        await this.user._createOwnerIfNotExists()
    }
}
