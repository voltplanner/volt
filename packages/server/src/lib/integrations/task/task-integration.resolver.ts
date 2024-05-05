import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@shared/decorators'
import { CurrentUserPayload } from '@shared/interfaces'

import { AuthUserService } from '../../modules/auth/services/auth-user.service'
import { TaskService } from '../../modules/task/services/task.service'
import { ACLGuard } from '../../shared/guards/acl.guard'
import {
    PrismaService,
    PrismaServiceWithExtentionsType,
} from '../../shared/prisma'
import { TaskIntegrationTaskInput } from './types-input/task-integration-task.input-type'
import { TaskIntegrationTaskCreateInput } from './types-input/task-integration-task-create.input-type'
import { TaskIntegrationTaskUpdateInput } from './types-input/task-integration-task-update.input-type'
import { TaskIntegrationTasksInput } from './types-input/task-integration-tasks.input-type'
import { TaskIntegrationTasksOfCurrentUserInput } from './types-input/task-integration-tasks-of-current-user.input-type'
import { TaskIntegrationTaskObject } from './types-object/task-integration-task.object-type'
import { TaskIntegrationTasksOutput } from './types-output/task-integration-tasks.output-type'
import { TaskIntegrationTasksOfCurrentUserOutput } from './types-output/task-integration-tasks-of-current-user.output-type'

@Resolver()
export class TaskIntegrationResolver {
    constructor(
        private readonly _authUserService: AuthUserService,
        private readonly _taskService: TaskService,
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    @UseGuards(ACLGuard)
    @Mutation(() => String)
    async createTask(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input') input: TaskIntegrationTaskCreateInput,
    ): Promise<string> {
        const {
            projectId,
            name,
            description,
            statusId,
            assignedToId,
            estimatedDuration,
            tagsIds,
            parentId,
        } = input

        const estimatedDateEnd = input.estimatedDateEnd
            ? new Date(input.estimatedDateEnd)
            : input.estimatedDateEnd === null
            ? null
            : undefined

        const estimatedDateStart = input.estimatedDateStart
            ? new Date(input.estimatedDateStart)
            : input.estimatedDateStart === null
            ? null
            : undefined

        return await this._prismaService.$transaction(async (tx) => {
            const taskId = await this._taskService.create(
                {
                    createdById: userId,
                    name,
                    projectId,
                    statusId,
                    assignedToId,
                    description,
                    estimatedDateEnd,
                    estimatedDateStart,
                    estimatedDuration,
                    parentId,
                    tagsIds,
                },
                tx,
            )

            return taskId
        })
    }

    @Mutation(() => String)
    async updateTask(@Args('input') input: TaskIntegrationTaskUpdateInput) {
        return await this._taskService.update(input)
    }

    @Query(() => TaskIntegrationTaskObject)
    async task(
        @Args('input') input: TaskIntegrationTaskInput,
    ): Promise<TaskIntegrationTaskObject> {
        const task = await this._taskService.getById(input)

        const userAssigned = await this._authUserService.getUser(
            task.assignedToId,
        )
        const userCreated = await this._authUserService.getUser(
            task.createdById,
        )

        return {
            ...task,
            createdBy: {
                id: userCreated.id,
                lastname: userCreated.lastname,
                firstname: userCreated.firstname,
            },
            assignedTo: {
                id: userAssigned.id,
                lastname: userAssigned.lastname,
                firstname: userAssigned.firstname,
            },
            createdAt: Number(task.createdAt),
            estimatedDateEnd: Number(task.estimatedDateEnd),
            estimatedDateStart: Number(task.estimatedDateStart),
            estimatedDuration: Number(task.estimatedDuration.toString()),
        }
    }

    @Query(() => TaskIntegrationTasksOutput)
    async tasks(
        @Args('input', { nullable: true })
        input?: TaskIntegrationTasksInput | null,
    ): Promise<TaskIntegrationTasksOutput> {
        const { projectId, curPage, perPage } = input || {}

        const { data, meta } = await this._taskService.findMany({
            filterByProjectId: projectId || undefined,
            curPage: curPage || undefined,
            perPage: perPage || undefined,
        })

        const tasks: TaskIntegrationTaskObject[] = []

        for (const task of data) {
            const userAssigned = await this._authUserService.getUser(
                task.assignedToId,
            )
            const userCreated = await this._authUserService.getUser(
                task.createdById,
            )

            tasks.push({
                ...task,
                createdBy: {
                    id: userCreated.id,
                    lastname: userCreated.lastname,
                    firstname: userCreated.firstname,
                },
                assignedTo: {
                    id: userAssigned.id,
                    lastname: userAssigned.lastname,
                    firstname: userAssigned.firstname,
                },
                createdAt: Number(task.createdAt),
                estimatedDateEnd: Number(task.estimatedDateEnd),
                estimatedDateStart: Number(task.estimatedDateStart),
                estimatedDuration: Number(task.estimatedDuration.toString()),
            })
        }

        return { meta, data: tasks }
    }

    @UseGuards(ACLGuard)
    @Query(() => TaskIntegrationTasksOfCurrentUserOutput)
    async tasksOfCurrentUser(
        @CurrentUser() { userId }: CurrentUserPayload,
        @Args('input', { nullable: true })
        input?: TaskIntegrationTasksOfCurrentUserInput | null,
    ): Promise<TaskIntegrationTasksOfCurrentUserOutput> {
        const { projectId, curPage, perPage } = input || {}

        const { data, meta } = await this._taskService.findMany({
            filterByAssignedToId: userId,
            filterByProjectId: projectId || undefined,
            curPage: curPage || undefined,
            perPage: perPage || undefined,
        })

        const tasks: TaskIntegrationTaskObject[] = []

        for (const task of data) {
            const userAssigned = await this._authUserService.getUser(
                task.assignedToId,
            )
            const userCreated = await this._authUserService.getUser(
                task.createdById,
            )

            tasks.push({
                ...task,
                createdBy: {
                    id: userCreated.id,
                    lastname: userCreated.lastname,
                    firstname: userCreated.firstname,
                },
                assignedTo: {
                    id: userAssigned.id,
                    lastname: userAssigned.lastname,
                    firstname: userAssigned.firstname,
                },
                createdAt: Number(task.createdAt),
                estimatedDateEnd: Number(task.estimatedDateEnd),
                estimatedDateStart: Number(task.estimatedDateStart),
                estimatedDuration: Number(task.estimatedDuration.toString()),
            })
        }

        return { meta, data: tasks }
    }
}
