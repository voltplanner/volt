import { Injectable } from '@nestjs/common'
import { filter, ReplaySubject, tap } from 'rxjs'

import { EventsServiceInterface } from './interfaces/events.interfaces'

export interface Event {
    pattern: string
    data: any
}

@Injectable()
export class RxJsEventsService
    extends ReplaySubject<Event>
    implements EventsServiceInterface
{
    async send(event: Event) {
        this.next(event)
    }

    async listen(pattern: string, callback): Promise<void> {
        this.asObservable()
            .pipe(filter<Event>((event) => event.pattern === pattern))
            .pipe(tap(callback))
            .subscribe()
    }
}
