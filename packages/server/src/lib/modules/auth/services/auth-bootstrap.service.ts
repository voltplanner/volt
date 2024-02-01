import { Injectable } from '@nestjs/common'

import { AuthAdminService } from './auth-admin.service'
import { AuthRoleService } from './auth-role.service'

@Injectable()
export class AuthBootstrapService {
    constructor(
        private readonly admin: AuthAdminService,
        private readonly role: AuthRoleService,
    ) {}

    async onApplicationBootstrap() {
        await this.role._createDefaultRole()
        await this.role._updateMethods()
        await this.admin._createOwnerIfNotExists()
    }
}
