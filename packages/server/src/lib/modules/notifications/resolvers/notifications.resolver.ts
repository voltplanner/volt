import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'

import { AccessControl } from '../../../shared/decorators'
import { CurrentUser } from '../../../shared/decorators/current-user.decorator'
import { ACLGuard } from '../../../shared/guards/acl.guard'
import { CurrentUserPayload } from '../../../shared/interfaces/shared.interfaces'
import {
    ChangeMyNotificationPreferences,
    GetNotificationPreferences,
    NotificationWebResponse,
} from '../interfaces/notifications.graphql'
import { NotificationsPreferencesService } from '../services/preferences.service'
import { NotificationsWebService } from '../services/web.service'

@Resolver()
export class NotificationsResolver {
    constructor(
        private readonly preferencesService: NotificationsPreferencesService,
        private readonly webService: NotificationsWebService,
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
    @Subscription(() => NotificationWebResponse, {})
    @AccessControl({
        group: 'notifications',
        description: `Get web notifications`,
    })
    async getNotifications() {
        return this.webService.subscribe()
    }
}
