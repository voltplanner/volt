import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'

import { AccessControl } from '../../../shared/decorators'
import { CurrentUser } from '../../../shared/decorators/current-user.decorator'
import { ACLGuard } from '../../../shared/guards/acl.guard'
import { CurrentUserPayload } from '../../../shared/interfaces/shared.interfaces'
import {
    ChangeMyNotificationPreferences,
    GetNotificationPreferences,
    GetNotificationsInput,
    GetNotificationsResponse,
    MarkAllAsSeenInput,
    MarkAsSeenInput,
    OnNewNotification,
} from '../interfaces/notifications.graphql'
import { NotificationsService } from '../services/notifications.service'
import { NotificationsPreferencesService } from '../services/preferences.service'
import { NotificationsWebService } from '../services/web.service'

@Resolver()
export class NotificationsResolver {
    constructor(
        private readonly preferencesService: NotificationsPreferencesService,
        private readonly webService: NotificationsWebService,
        private readonly notificationsService: NotificationsService,
    ) {}

    @UseGuards(ACLGuard)
    @Query(() => GetNotificationPreferences)
    @AccessControl({
        group: 'notifications',
        description: `Get user's notification preferences`,
    })
    async getMyNotificationPreferences(
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<GetNotificationPreferences> {
        return await this.preferencesService.getPreferences(user.userId)
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({
        group: 'notifications',
        description: `Change notification preferences`,
    })
    async changeMyNotificationPreferences(
        @Args('input') input: ChangeMyNotificationPreferences,
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<boolean> {
        await this.preferencesService.changePreferences({
            userId: user.userId,
            ...input,
        })

        return true
    }

    @UseGuards(ACLGuard)
    @Subscription(() => OnNewNotification)
    @AccessControl({
        group: 'notifications',
        description: `Get web notifications (WS)`,
    })
    async onNewNotification(@CurrentUser() user: CurrentUserPayload) {
        return this.webService.subscribe(user.userId)
    }

    @UseGuards(ACLGuard)
    @Query(() => [GetNotificationsResponse])
    @AccessControl({
        group: 'notifications',
        description: `Get notifications`,
    })
    async getMyNotifications(
        @CurrentUser() user: CurrentUserPayload,
        @Args('input') input: GetNotificationsInput,
    ) {
        return this.notificationsService.getNotifications({
            ...input,
            userId: user.userId,
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({
        group: 'notifications',
        description: `Mark notification as seen`,
    })
    async markAsSeen(
        @Args('input') input: MarkAsSeenInput,
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<boolean> {
        await this.notificationsService.markAsSeen({
            ...input,
            userId: user.userId,
        })

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({
        group: 'notifications',
        description: `Mark all notification as seen`,
    })
    async markAllAsSeen(
        @Args('input') input: MarkAllAsSeenInput,
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<boolean> {
        await this.notificationsService.markAllAsSeen({
            ...input,
            userId: user.userId,
        })

        return true
    }
}
