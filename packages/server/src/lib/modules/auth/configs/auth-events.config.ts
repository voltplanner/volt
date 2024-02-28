import {
    EventsServiceInterface,
    EventsServiceInterfaceConstructor,
} from '../../../shared/events/interfaces/events.interfaces'

export const AUTH_EVENTS = 'AUTH_EVENTS'

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
