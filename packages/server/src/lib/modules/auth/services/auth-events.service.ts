import { Injectable } from '@nestjs/common'
import { filter, Observable, ReplaySubject } from 'rxjs'

export interface AuthCompleteSignUpEvent {
    userId: string
    code: string
}

export type AuthEventData = AuthCompleteSignUpEvent

export enum AuthEventPattern {
    COMPLETE_SIGNIN = 'COMPLETE_SIGNIN',
}

export interface AuthEvent<T extends AuthEventData> {
    pattern: AuthEventPattern
    data: T
}

@Injectable()
export class AuthEventsService extends ReplaySubject<AuthEvent<AuthEventData>> {
    send(event: AuthEvent<AuthEventData>) {
        this.next(event)
    }

    listen<T extends AuthEventData>(pattern: AuthEventPattern) {
        return this.asObservable().pipe(
            filter((event) => event.pattern === pattern),
        ) as Observable<AuthEvent<T>>
    }
}
