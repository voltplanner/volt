import { Injectable } from '@nestjs/common'

import { AuthACLService } from './auth-acl.service'
import { AuthAdminService } from './auth-admin.service'

@Injectable()
export class AuthBootstrapService {
    constructor(
        private readonly admin: AuthAdminService,
        private readonly acl: AuthACLService,
    ) {}

    async onApplicationBootstrap() {
        await this.acl._createDefaultRole()
        await this.acl._updateMethods()
        await this.acl._createDefaultPermissions()
        await this.admin._createOwnerIfNotExists()
    }
}
