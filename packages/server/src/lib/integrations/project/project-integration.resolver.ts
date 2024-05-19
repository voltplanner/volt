import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@shared/decorators'
import { CurrentUserPayload, OrderEnum } from '@shared/interfaces'

import { AuthUserService } from '../../modules/auth/services/auth-user.service'
import { TaskProjectService } from '../../modules/task/services/task-project.service'
import { TaskUserService } from '../../modules/task/services/task-user.service'
import { ACLGuard } from '../../shared/guards/acl.guard'
import {
    AuthUserStatusEnum,
    PrismaService,
    PrismaServiceWithExtentionsType,
} from '../../shared/prisma'
import { ProjectIntegrationProjectInput } from './types-input/project-integration-project.input-type'
import {
    ProjectIntegrationCreateProjectInput,
    ProjectIntegrationCreateProjectMemberInput,
} from './types-input/project-integration-project-create.input-type'
import { ProjectIntegrationProjectTasksRelationsInput } from './types-input/project-integration-project-tasks-relations.input-type'
import { ProjectIntegrationProjectTasksStatusesInput } from './types-input/project-integration-project-tasks-statuses.input-type'
import { ProjectIntegrationProjectTasksTagsInput } from './types-input/project-integration-project-tasks-tags.input-type'
import { ProjectIntegrationProjectUpdateInput } from './types-input/project-integration-project-update.input-type'
import { ProjectIntegrationProjectUsersInput } from './types-input/project-integration-project-users.input-type'
import { ProjectIntegrationProjectUsersRolesInput } from './types-input/project-integration-project-users-roles.input-type'
import { ProjectIntegrationProjectsInput } from './types-input/project-integration-projects.input-type'
import { ProjectIntegrationProjectObject } from './types-object/project-integration-project.object-type'
import { ProjectIntegrationTasksRelationObject } from './types-object/project-integration-tasks-relation.object-type'
import { ProjectIntegrationTasksStatusObject } from './types-object/project-integration-tasks-status.object-type'
import { ProjectIntegrationTasksTagObject } from './types-object/project-integration-tasks-tag.object-type'
import { ProjectIntegrationUsersRoleObject } from './types-object/project-integration-users-role.object-type'
import { ProjectIntegrationProjectUsersOutput } from './types-output/project-integration-project-users.output-type'
import { ProjectIntegrationProjectsOutput } from './types-output/project-integration-projects.output-type'
import { ProjectIntegrationProjectsOfCurrentUserOutput } from './types-output/project-integration-projects-of-current-user.output-type'

@Resolver()
export class ProjectIntegrationResolver {
    constructor(
        private readonly _authUserService: AuthUserService,
        private readonly _taskUserService: TaskUserService,
        private readonly _taskProjectService: TaskProjectService,
        @Inject(PrismaService)
        private readonly _prismaService: PrismaServiceWithExtentionsType,
    ) {}

    @Mutation(() => String)
    async createProject(
        @Args('input') input: ProjectIntegrationCreateProjectInput,
    ): Promise<string> {
        const { name, budget, deadline, description } = input

        const members: ProjectIntegrationCreateProjectMemberInput[] =
            input.members ?? []
        const userIds: string[] = []

        return await this._prismaService.$transaction(async (client) => {
            const projectId = await this._taskProjectService.create(
                {
                    name,
                    budget,
                    description,
                    deadline: new Date(deadline),
                },
                client,
            )

            for (const member of members) {
                const userId = await this._taskUserService.upsert(
                    { ...member, projectId },
                    client,
                )

                userIds.push(userId)
            }

            await this._taskProjectService.addUsers(
                {
                    projectId,
                    userIds,
                },
                client,
            )

            return projectId
        })
    }

    @Mutation(() => String)
    async updateProject(
        @Args('input') input: ProjectIntegrationProjectUpdateInput,
    ) {
        return await this._taskProjectService.update(input)
    }

    @Query(() => ProjectIntegrationProjectObject)
    async project(
        @Args('input') input: ProjectIntegrationProjectInput,
    ): Promise<ProjectIntegrationProjectObject> {
        const project = await this._taskProjectService.getById(input)

        return {
            ...project,
            deadline: Number(project.deadline),
            createdAt: Number(project.createdAt),
        }
    }

    @Query(() => ProjectIntegrationProjectsOutput)
    async projects(
        @Args('input', { nullable: true }) input: ProjectIntegrationProjectsInput,
    ): Promise<ProjectIntegrationProjectsOutput> {
        const { filterBy, curPage, perPage } = input || {}

        const { data, meta } = await this._taskProjectService.findMany({
            curPage: curPage || undefined,
            perPage: perPage || undefined,
            filterByName: filterBy?.name || undefined,
            filterByUserId: filterBy?.userId || undefined,
            filterByFulltext: filterBy?.fulltext || undefined,
            filterByCreatedAt: (filterBy?.createdAtFrom || filterBy?.createdAtTo) ? {
                from: filterBy?.createdAtFrom ? new Date(filterBy.createdAtFrom) : undefined,
                to: filterBy?.createdAtTo ? new Date(filterBy.createdAtTo) : undefined,
            } : undefined,
        })

        const projects: ProjectIntegrationProjectObject[] = data.map((i) => ({
            ...i,
            deadline: Number(i.deadline),
            createdAt: Number(i.createdAt),
        }))

        return { meta, data: projects }
    }

    @UseGuards(ACLGuard)
    @Query(() => ProjectIntegrationProjectsOfCurrentUserOutput)
    async projectsOfCurrentUser(
        @CurrentUser() { userId }: CurrentUserPayload,
    ): Promise<ProjectIntegrationProjectsOfCurrentUserOutput> {
        const { data, meta } = await this._taskProjectService.findMany({
            filterByUserId: userId,
        })

        const projects: ProjectIntegrationProjectObject[] = data.map((i) => ({
            ...i,
            deadline: Number(i.deadline),
            createdAt: Number(i.createdAt),
        }))

        return { meta, data: projects }
    }

    @Query(() => ProjectIntegrationProjectUsersOutput)
    async projectUsers(
        @Args('input') input: ProjectIntegrationProjectUsersInput,
    ): Promise<ProjectIntegrationProjectUsersOutput> {
        const { projectId, filterByName, orderBy, curPage, perPage } = input

        const projectUsersIds = await this._taskUserService.findAll({
            projectId,
        })

        const users = await this._authUserService.getUsers({
            curPage,
            perPage,
            filter: {
                ids: projectUsersIds,
                firstname: filterByName,
                lastname: filterByName,
                status: AuthUserStatusEnum.ACTIVE,
            },
            orderBy: orderBy || {
                field: 'lastname',
                order: OrderEnum.ASC,
            },
        })

        return {
            data: users.data.map((i) => ({
                id: i.id,
                lastname: i.lastname,
                firstname: i.firstname,
            })),
            meta: users.meta,
        }
    }

    @Query(() => [ProjectIntegrationUsersRoleObject])
    async projectUsersRoles(
        @Args('input') input: ProjectIntegrationProjectUsersRolesInput,
    ): Promise<ProjectIntegrationUsersRoleObject[]> {
        return await this._taskProjectService.findAllUsersRoles(input)
    }

    @Query(() => [ProjectIntegrationTasksTagObject])
    async projectTasksTags(
        @Args('input') input: ProjectIntegrationProjectTasksTagsInput,
    ): Promise<ProjectIntegrationTasksTagObject[]> {
        return await this._taskProjectService.findAllTasksTags(input)
    }

    @Query(() => [ProjectIntegrationTasksStatusObject])
    async projectTasksStatuses(
        @Args('input') input: ProjectIntegrationProjectTasksStatusesInput,
    ): Promise<ProjectIntegrationTasksStatusObject[]> {
        return await this._taskProjectService.findAllTasksStatuses(input)
    }

    @Query(() => [ProjectIntegrationTasksRelationObject])
    async projectTasksRelations(
        @Args('input') input: ProjectIntegrationProjectTasksRelationsInput,
    ): Promise<ProjectIntegrationTasksRelationObject[]> {
        return await this._taskProjectService.findAllTasksRelations(input)
    }
}
