import { Injectable } from '@nestjs/common'

import { environment } from '../../environments/environment'
import { AuthUserService } from '../modules/auth/services/auth-user.service'
import { NotificationsConfig } from '../modules/notifications/notifications.config'

@Injectable()
export class NotificationsIntegration implements NotificationsConfig {
    constructor(private readonly authUserService: AuthUserService) {}

    defaults = environment.notifications.defaults
    transport = environment.notifications.transport
    telegram = environment.notifications.telegram

    getEmailByUserId = async (externalUserId: string) => {
        const user = await this.authUserService.getUser(externalUserId)

        return user.email
    }
}
