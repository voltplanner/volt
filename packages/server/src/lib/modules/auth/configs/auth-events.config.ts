import { FactoryProvider } from '@nestjs/common'
import {
    EventsServiceInterface,
    EventsServiceInterfaceConstructor,
} from '@shelfjs/events'

export const AUTH_EVENTS = 'AUTH_EVENTS'

export type AuthEventServiceProvider = Omit<
    FactoryProvider<AuthEventServiceInterface>,
    'provide'
>

export type AuthEventServiceInterface = EventsServiceInterface<
    AuthEventPattern,
    AuthEventPatternToData
>
export type AuthEventServiceInterfaceConstructor =
    EventsServiceInterfaceConstructor<AuthEventPattern, AuthEventPatternToData>

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
