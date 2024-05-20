import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@shared/decorators'
import { CurrentUserPayload } from '@shared/interfaces'

import { AuthUserService } from '../../modules/auth/services/auth-user.service'
import { TaskCommentService } from '../../modules/task/services/task-comment.service'
import { ACLGuard } from '../../shared/guards/acl.guard'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
} from '../../shared/prisma'
import { getOneByProperty } from '../../shared/utils/find-in-array.util'
import { TaskCommentIntegrationCommentCreateInput } from './types-input/task-comment-integration-comment-create.input-type'
import { TaskCommentIntegrationCommentDeleteInput } from './types-input/task-comment-integration-comment-delete.input-type'
import { TaskCommentIntegrationCommentUpdateInput } from './types-input/task-comment-integration-comment-update.input-type'
import { TaskCommentIntegrationCommentsInput } from './types-input/task-comment-integration-comments.input-type'
import { TaskCommentIntegrationCommentObject } from './types-object/task-comment-integration-comment.object-type'
import { TaskCommentIntegrationCommentsOutput } from './types-output/task-comment-integration-comments.output-type'

@Resolver()
export class TaskCommentIntegrationResolver {
    constructor(
        private readonly _authUserService: AuthUserService,
        private readonly _taskCommentService: TaskCommentService,
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskCommentCreate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskCommentIntegrationCommentCreateInput,
    ): Promise<string> {
        const { taskId, text } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskCommentService.create(
                {
                    taskId,
                    userId,
                    text,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskCommentUpdate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskCommentIntegrationCommentUpdateInput,
    ) {
        const { id, text } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskCommentService.update(
                {
                    id,
                    text,
                    userId,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskCommentDelete(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskCommentIntegrationCommentDeleteInput,
    ) {
        const { id } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskCommentService.delete(
                {
                    id,
                    userId,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Query(() => TaskCommentIntegrationCommentsOutput)
    async taskComments(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskCommentIntegrationCommentsInput,
    ): Promise<TaskCommentIntegrationCommentsOutput> {
        const { taskId } = input

        const curPage = input.curPage ?? 1
        const perPage = input.perPage ?? 10

        const { data, meta } = await this._taskCommentService.findMany({
            taskId,
            curPage: curPage || undefined,
            perPage: perPage || undefined,
        })

        const users = await this._authUserService.getUsers({
            filter: { ids: data.map((i) => i.userId) },
            curPage: 1,
            perPage: data.length,
        })

        const taskComments: TaskCommentIntegrationCommentObject[] = data.map(
            (i) => {
                const commentOwner = getOneByProperty(
                    users.data,
                    'id',
                    i.userId,
                )

                return {
                    id: i.id,
                    taskId: i.taskId,
                    text: i.text,
                    createdAt: Number(i.createdAt),
                    updatedAt: Number(i.updatedAt),
                    isCanDelete: commentOwner.id === userId,
                    isCanUpdate: commentOwner.id === userId,
                    user: {
                        id: commentOwner.id,
                        lastname: commentOwner.lastname,
                        firstname: commentOwner.firstname,
                    },
                }
            },
        )

        return { meta, data: taskComments }
    }
}
