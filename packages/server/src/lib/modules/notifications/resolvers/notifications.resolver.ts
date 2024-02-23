import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AccessControl } from '../../../shared/decorators'
import { CurrentUser } from '../../../shared/decorators/current-user.decorator'
import { ACLGuard } from '../../../shared/guards/acl.guard'
import { CurrentUserPayload } from '../../../shared/interfaces/shared.interfaces'
import { LinkTelegramAccountInput } from '../interfaces/notifications.graphql'
import { NotificationsTelegramService } from '../services/telegram.service'

@Resolver()
export class NotificationsResolver {
    constructor(
        private readonly telegramService: NotificationsTelegramService,
    ) {}

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({
        group: 'notifications',
        description: 'Link telegram account',
    })
    async linkTelegramAccount(
        @Args('input') input: LinkTelegramAccountInput,
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<boolean> {
        await this.telegramService.linkTelegramAccount({
            userId: user.userId,
            chatId: input.chatId,
        })

        return true
    }

    @UseGuards(ACLGuard)
    @Mutation(() => Boolean)
    @AccessControl({
        group: 'notifications',
        description: 'Unlink telegram account',
    })
    async unlinkTelegramAccount(
        @CurrentUser() user: CurrentUserPayload,
    ): Promise<boolean> {
        await this.telegramService.unlinkTelegramAccount({
            userId: user.userId,
        })

        return true
    }
}
