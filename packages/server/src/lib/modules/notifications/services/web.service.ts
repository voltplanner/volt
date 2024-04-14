import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

import { SendWebPayload } from '../interfaces/notifications.interfaces'

@Injectable()
export class NotificationsWebService {
    private _pubSub = new PubSub()
    private _triggerName = 'web'

    subscribe() {
        return this._pubSub.asyncIterator<SendWebPayload>(this._triggerName)
    }

    async send(data: SendWebPayload) {
        const { userId, message, topic, link } = data

        this._pubSub.publish(this._triggerName, {
            userId,
            message,
            topic,
            link,
        })
    }
}
