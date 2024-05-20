import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@shared/decorators'
import { CurrentUserPayload } from '@shared/interfaces'

import { AuthUserService } from '../../modules/auth/services/auth-user.service'
import { TaskEffortService } from '../../modules/task/services/task-effort.service'
import { ACLGuard } from '../../shared/guards/acl.guard'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
} from '../../shared/prisma'
import { getOneByProperty } from '../../shared/utils/find-in-array.util'
import { TaskEffortIntegrationEffortCreateInput } from './types-input/task-effort-integration-effort-create.input-type'
import { TaskEffortIntegrationEffortDeleteInput } from './types-input/task-effort-integration-effort-delete.input-type'
import { TaskEffortIntegrationEffortUpdateInput } from './types-input/task-effort-integration-effort-update.input-type'
import { TaskEffortIntegrationEffortsInput } from './types-input/task-effort-integration-efforts.input-type'
import { TaskEffortIntegrationEffortObject } from './types-object/task-effort-integration-effort.object-type'
import { TaskEffortIntegrationEffortsOutput } from './types-output/task-effort-integration-efforts.output-type'

@Resolver()
export class TaskEffortIntegrationResolver {
    constructor(
        private readonly _authUserService: AuthUserService,
        private readonly _taskEffortService: TaskEffortService,
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskEffortCreate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskEffortIntegrationEffortCreateInput,
    ): Promise<string> {
        const { taskId, value, description } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskEffortService.create(
                {
                    taskId,
                    userId,
                    description,
                    value,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskEffortUpdate(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskEffortIntegrationEffortUpdateInput,
    ) {
        const { id, description, value } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskEffortService.update(
                {
                    id,
                    userId,
                    description,
                    value,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async taskEffortDelete(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskEffortIntegrationEffortDeleteInput,
    ) {
        const { id } = input

        return await this._prismaService.$transaction(async (tx) => {
            return await this._taskEffortService.delete(
                {
                    id,
                    userId,
                },
                tx,
            )
        })
    }

    @UseGuards(ACLGuard)
    @Query(() => TaskEffortIntegrationEffortsOutput)
    async taskEfforts(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input', { nullable: true })
        input?: TaskEffortIntegrationEffortsInput | null,
    ): Promise<TaskEffortIntegrationEffortsOutput> {
        const { taskId } = input || {}

        const curPage = input.curPage ?? 1
        const perPage = input.perPage ?? 10

        const { data, meta } = await this._taskEffortService.findMany({
            filterByTaskId: taskId || undefined,
            curPage: curPage || undefined,
            perPage: perPage || undefined,
        })

        const users = await this._authUserService.getUsers({
            filter: { ids: data.map((i) => i.userId) },
            curPage: 1,
            perPage: data.length,
        })

        const taskEfforts: TaskEffortIntegrationEffortObject[] = data.map(
            (i) => {
                const owner = getOneByProperty(users.data, 'id', i.userId)

                return {
                    id: i.id,
                    taskId: i.taskId,
                    value: i.value,
                    description: i.description,
                    createdAt: Number(i.createdAt),
                    updatedAt: Number(i.updatedAt),
                    isCanDelete: owner.id === userId,
                    isCanUpdate: owner.id === userId,
                    user: {
                        id: owner.id,
                        lastname: owner.lastname,
                        firstname: owner.firstname,
                    },
                }
            },
        )

        return { meta, data: taskEfforts }
    }
}
