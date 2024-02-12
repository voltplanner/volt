import { Injectable, Logger } from '@nestjs/common'
import { tap } from 'rxjs'

import { environment } from '../../environments/environment'
import {
    AuthEventPattern,
    AuthEventsService,
} from '../modules/auth/services/auth-events.service'
import { NotificationsService } from '../modules/notifications/services/notifications.service'
import { NotificationTypeEnum } from '../shared/prisma'

@Injectable()
export class AuthIntegration {
    private logger = new Logger()

    constructor(
        private readonly authEvents: AuthEventsService,
        private readonly notificationService: NotificationsService,
    ) {}

    async onApplicationBootstrap() {
        try {
            this.listenCompleteSignIn()
        } catch (error) {
            this.logger.error(error, error.stack)
        }
    }

    listenCompleteSignIn() {
        this.authEvents
            .listen(AuthEventPattern.COMPLETE_SIGNIN)
            .pipe(
                tap((event) => {
                    const { data } = event
                    this.notificationService.sendNotification({
                        type: NotificationTypeEnum.EMAIL,
                        userId: data.userId,
                        topic: 'Complete registration in Volt',
                        message: `${environment.rootUrl}login?code=${data.code}&userId=${data.userId}`,
                    })
                }),
            )
            .subscribe({
                error: (error) => this.logger.error(error, error.stack),
            })
    }
}
