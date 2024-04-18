import { FactoryProvider } from '@nestjs/common'
import {
    EventsListenerInterface,
    EventsPublisherInterface,
} from '@shelfjs/events'

export const TASK_PUBLISHER = 'TASK_PUBLISHER'
export const TASK_LISTENER = 'TASK_LISTENER'
export const TASK_CONTEXT = 'task'

export type TaskEventPublisherProvider = Omit<
    FactoryProvider<TaskEventsPublisher>,
    'provide'
>

export type TaskEventsPublisher = EventsPublisherInterface<
    TaskEventPattern,
    TaskEventPatternToData
>

export type TaskEventsListener = EventsListenerInterface<
    TaskEventPattern,
    TaskEventPatternToData
>

export enum TaskEventPattern {
    TEMP = 'TEMP',
}

export interface TaskCompleteSignInEvent {
    userId: string
    code: string
    email: string
}

type TaskEventPatternToData = {
    [TaskEventPattern.TEMP]: TaskCompleteSignInEvent
}
