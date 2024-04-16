import { FactoryProvider } from '@nestjs/common'
import {
    EventsListenerInterface,
    EventsPublisherInterface,
} from '@shelfjs/events'

export const AUTH_PUBLISHER = 'AUTH_PUBLISHER'
export const AUTH_LISTENER = 'AUTH_LISTENER'
export const AUTH_CONTEXT = 'auth'

export type AuthEventPublisherProvider = Omit<
    FactoryProvider<AuthEventsPublisher>,
    'provide'
>

export type AuthEventsPublisher = EventsPublisherInterface<
    AuthEventPattern,
    AuthEventPatternToData
>

export type AuthEventsListener = EventsListenerInterface<
    AuthEventPattern,
    AuthEventPatternToData
>

export enum AuthEventPattern {
    COMPLETE_SIGNIN = 'COMPLETE_SIGNIN',
}

export interface AuthCompleteSignInEvent {
    userId: string
    code: string
    email: string
}

type AuthEventPatternToData = {
    [AuthEventPattern.COMPLETE_SIGNIN]: AuthCompleteSignInEvent
}
