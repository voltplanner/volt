import { Field, ObjectType } from '@nestjs/graphql'

import { TaskCommentIntegrationUserObject } from './task-comment-integration-user.object-type'

@ObjectType()
export class TaskCommentIntegrationCommentObject {
    @Field(() => String)
    readonly id!: string

    @Field(() => String)
    readonly text!: string

    @Field(() => String)
    readonly taskId!: string

    @Field(() => TaskCommentIntegrationUserObject)
    readonly user!: TaskCommentIntegrationUserObject

    @Field(() => Boolean)
    readonly isCanEdit!: boolean

    @Field(() => Boolean)
    readonly isCanDelete!: boolean

    @Field(() => Number)
    readonly createdAt: number

    @Field(() => Number)
    readonly updatedAt: number
}
