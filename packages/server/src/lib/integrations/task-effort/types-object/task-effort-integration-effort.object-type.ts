import { Field, ObjectType } from '@nestjs/graphql'

import { TaskEffortIntegrationUserObject } from './task-effort-integration-user.object-type'

@ObjectType()
export class TaskEffortIntegrationEffortObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => Number)
    readonly value!: number

    @Field(() => String)
    readonly description!: string

    @Field(() => String)
    readonly taskId!: string

    @Field(() => TaskEffortIntegrationUserObject)
    readonly user!: TaskEffortIntegrationUserObject

    @Field(() => Boolean)
    readonly isCanUpdate!: boolean

    @Field(() => Boolean)
    readonly isCanDelete!: boolean

    @Field(() => Number)
    readonly createdAt: number

    @Field(() => Number)
    readonly updatedAt: number
}
