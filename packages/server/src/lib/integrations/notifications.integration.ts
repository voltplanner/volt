import { Inject, Injectable, Logger } from '@nestjs/common'

import { environment } from '../../environments/environment'
import {
    AUTH_LISTENER,
    AuthEventPattern,
    AuthEventsListener,
} from '../modules/auth/configs/auth-events.config'
import { NotificationsService } from '../modules/notifications/services/notifications.service'

@Injectable()
export class NotificationsIntegration {
    private logger = new Logger()

    constructor(
        @Inject(AUTH_LISTENER)
        private readonly authEvents: AuthEventsListener,
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
