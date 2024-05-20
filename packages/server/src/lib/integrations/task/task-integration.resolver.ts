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
    async taskCreate(
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
            tagIds,
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
                    tagIds,
                },
                tx,
            )

            return taskId
        })
    }

    @Mutation(() => String)
    async taskUpdate(@Args('input') input: TaskIntegrationTaskUpdateInput) {
        return await this._taskService.update(input)
    }

    @Query(() => TaskIntegrationTaskObject)
    async task(
        @Args('input') input: TaskIntegrationTaskInput,
    ): Promise<TaskIntegrationTaskObject> {
        const task = await this._taskService.getById(input)

        const userAssigned = task.assignedToId
            ? await this._authUserService.getUser(task.assignedToId)
            : undefined
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
            assignedTo: userAssigned
                ? {
                      id: userAssigned.id,
                      lastname: userAssigned.lastname,
                      firstname: userAssigned.firstname,
                  }
                : undefined,
            createdAt: Number(task.createdAt),
            effortsMs: task.effortsMs || 0,
            estimatedDateEnd: task.estimatedDateEnd
                ? Number(task.estimatedDateEnd)
                : undefined,
            estimatedDateStart: task.estimatedDateStart
                ? Number(task.estimatedDateStart)
                : undefined,
            estimatedDuration: task.estimatedDuration
                ? Number(task.estimatedDuration.toString())
                : undefined,
        }
    }

    @Query(() => TaskIntegrationTasksOutput)
    async tasks(
        @Args('input', { nullable: true })
        input?: TaskIntegrationTasksInput | null,
    ): Promise<TaskIntegrationTasksOutput> {
        const { filterBy, curPage, perPage } = input || {}

        const { data, meta } = await this._taskService.findMany({
            curPage: curPage || undefined,
            perPage: perPage || undefined,
            filterByName: filterBy?.name || undefined,
            filterByTagId: filterBy?.tagId || undefined,
            filterByNumber: filterBy?.number || undefined,
            filterByStatusId: filterBy?.statusId || undefined,
            filterByParentId: filterBy?.parentId || undefined,
            filterByProjectId: filterBy?.projectId || undefined,
            filterByCreatedById: filterBy?.createdById || undefined,
            filterByAssignedToId: filterBy?.assignedToId || undefined,
            filterByFulltext: filterBy?.fulltext || undefined,
            filterByCreatedAt:
                filterBy?.createdAtFrom || filterBy?.createdAtTo
                    ? {
                          from: filterBy?.createdAtFrom
                              ? new Date(filterBy.createdAtFrom)
                              : undefined,
                          to: filterBy?.createdAtTo
                              ? new Date(filterBy.createdAtTo)
                              : undefined,
                      }
                    : undefined,
        })

        const tasks: TaskIntegrationTaskObject[] = []

        for (const task of data) {
            let userAssigned:
                | Awaited<ReturnType<AuthUserService['getUser']>>
                | undefined

            if (task.assignedToId) {
                userAssigned = await this._authUserService.getUser(
                    task.assignedToId,
                )
            }

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
                assignedTo: userAssigned
                    ? {
                          id: userAssigned.id,
                          lastname: userAssigned.lastname,
                          firstname: userAssigned.firstname,
                      }
                    : undefined,
                createdAt: Number(task.createdAt),
                effortsMs: task.effortsMs || 0,
                estimatedDateEnd: task.estimatedDateEnd
                    ? Number(task.estimatedDateEnd)
                    : undefined,
                estimatedDateStart: task.estimatedDateStart
                    ? Number(task.estimatedDateStart)
                    : undefined,
                estimatedDuration: task.estimatedDuration
                    ? Number(task.estimatedDuration.toString())
                    : undefined,
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
                effortsMs: task.effortsMs || 0,
                estimatedDateEnd: Number(task.estimatedDateEnd),
                estimatedDateStart: Number(task.estimatedDateStart),
                estimatedDuration: Number(task.estimatedDuration.toString()),
            })
        }

        return { meta, data: tasks }
    }
}
