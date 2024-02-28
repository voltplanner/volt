import { Inject, Injectable, Logger } from '@nestjs/common'

import { environment } from '../../environments/environment'
import {
    AUTH_EVENTS,
    AuthEventPattern,
    AuthEventServiceInterface,
} from '../modules/auth/configs/auth-events.config'
import { NotificationsService } from '../modules/notifications/services/notifications.service'

@Injectable()
export class AuthIntegration {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_EVENTS)
        private readonly authEvents: AuthEventServiceInterface,
        private readonly notificationsService: NotificationsService,
    ) {}

    async onApplicationBootstrap() {
        try {
            this.listenCompleteSignIn()
        } catch (error) {
            this.logger.error(error, error.stack)
        }
    }

    listenCompleteSignIn() {
        this.authEvents.listen(
            AuthEventPattern.COMPLETE_SIGNIN,
            async (event) => {
                const { data } = event

                await this.notificationsService.sendForceEmailNotification({
                    email: data.email,
                    userId: data.userId,
                    topic: 'Complete registration in Volt',
                    message: `${environment.rootUrl}login?code=${data.code}&userId=${data.userId}`,
                })
            },
        )
    }
}
