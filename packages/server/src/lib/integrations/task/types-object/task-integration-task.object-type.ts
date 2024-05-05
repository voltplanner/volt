import { Field, ObjectType } from '@nestjs/graphql'

import { TaskIntegrationTaskStatusObject } from './task-integration-task-status.object-type'
import { TaskIntegrationTaskTagObject } from './task-integration-task-tag.object-type'
import { TaskIntegrationUserObject } from './task-integration-user.object-type'

@ObjectType()
export class TaskIntegrationTaskObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly name!: string

    @Field(() => Number)
    readonly number!: number

    @Field(() => String, { nullable: true })
    readonly description?: string | null

    @Field(() => Number, { nullable: true })
    readonly estimatedDateStart?: number

    @Field(() => Number, { nullable: true })
    readonly estimatedDateEnd?: number

    @Field(() => Number, { nullable: true })
    readonly estimatedDuration?: number

    @Field(() => Number)
    readonly version: number

    @Field(() => Number)
    readonly createdAt: number

    @Field(() => TaskIntegrationTaskStatusObject)
    readonly status: TaskIntegrationTaskStatusObject

    @Field(() => [TaskIntegrationTaskTagObject])
    readonly tags: TaskIntegrationTaskTagObject[]

    @Field(() => TaskIntegrationUserObject)
    readonly createdBy: TaskIntegrationUserObject

    @Field(() => TaskIntegrationUserObject, { nullable: true })
    readonly assignedTo?: TaskIntegrationUserObject | null
}
