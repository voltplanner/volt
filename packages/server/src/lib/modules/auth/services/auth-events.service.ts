import { Injectable } from '@nestjs/common'
import { filter, Observable, ReplaySubject } from 'rxjs'

export interface AuthEvent<T extends AuthEventPattern = AuthEventPattern> {
    pattern: T
    data: AuthEventPaternToData[T]
}

export enum AuthEventPattern {
    COMPLETE_SIGNIN = 'COMPLETE_SIGNIN',
}

export interface AuthCompleteSignUpEvent {
    userId: string
    code: string
}

type AuthEventPaternToData = {
    [AuthEventPattern.COMPLETE_SIGNIN]: AuthCompleteSignUpEvent
}

@Injectable()
export class AuthEventsService extends ReplaySubject<
    AuthEvent<AuthEventPattern>
> {
    send(event: AuthEvent<AuthEventPattern>) {
        this.next(event)
    }

    listen<T extends AuthEventPattern>(pattern: T): Observable<AuthEvent<T>> {
        return this.asObservable().pipe(
            filter<AuthEvent<T>>((event) => event.pattern === pattern),
        )
    }
}
