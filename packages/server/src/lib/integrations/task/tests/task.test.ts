
import { setup as setupTest } from './support/global-setup'
import { teardown } from './support/global-teardown'
import { GlobalUtils } from './support/global-utils'

let setup: Awaited<ReturnType<typeof setupTest>>
let utils: GlobalUtils

describe('Task', () => {
    jest.setTimeout(5 * 60 * 1000)

    beforeAll(async () => {
        setup = await setupTest()
        utils = new GlobalUtils(setup)
    })

    afterEach(async () => {
        await setup.prisma.taskOnTaskTag.deleteMany()
        await setup.prisma.taskProjectOnUser.deleteMany()
        await setup.prisma.taskOnTaskRelation.deleteMany()

        await setup.prisma.taskAttachment.deleteMany()
        await setup.prisma.taskChange.deleteMany()
        await setup.prisma.taskComment.deleteMany()
        await setup.prisma.taskCustomField.deleteMany()
        await setup.prisma.taskEffort.deleteMany()
        await setup.prisma.task.deleteMany()

        await setup.prisma.taskUser.deleteMany()
        await setup.prisma.taskUserRole.deleteMany()
        await setup.prisma.taskTag.deleteMany()
        await setup.prisma.taskStatus.deleteMany()
        await setup.prisma.taskRelation.deleteMany()
        await setup.prisma.taskProject.deleteMany()
    })

    afterAll(async () => {
        await teardown(setup)
    })

    describe('GQL API', () => {
        it('Must create task', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })
            const { createTask } = await utils.gqlCreateTask({
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: projectTasksTags.map((i: any) => i.id),
                statusId: projectTasksStatuses.find((i: any) => i.code === 'OPENED').id,
            }, adminAccessToken)

            expect(typeof createTask).toBe('string')
        })

        it('Must return task', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })
           
            const taskPayloadStatus = projectTasksStatuses.find((i: any) => i.code === 'OPENED')
            const taskPayloadTags = projectTasksTags

            const taskPayload = {
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: taskPayloadTags.map((i: any) => i.id),
                statusId: taskPayloadStatus.id,
            }

            const { createTask } = await utils.gqlCreateTask(taskPayload, adminAccessToken)
            const { task } = await utils.gqlTask({ id: createTask })

            expect(typeof task.createdAt).toBe('number')
            
            expect(task.id).toBe(createTask)
            expect(task.number).toBe(1)
            expect(task.version).toBe(0)
            expect(task.name).toBe(taskPayload.name)
            expect(task.description).toBe(taskPayload.description)
            expect(task.estimatedDateEnd).toBe(taskPayload.estimatedDateEnd)
            expect(task.estimatedDuration).toBe(taskPayload.estimatedDuration)
            expect(task.estimatedDateStart).toBe(taskPayload.estimatedDateStart)

            expect(task.status.id).toBe(taskPayloadStatus.id)
            expect(task.status.code).toBe(taskPayloadStatus.code)
            expect(task.status.name).toBe(taskPayloadStatus.name)

            expect(task.createdBy.id).toBe(adminUser.id)
            expect(task.createdBy.lastname).toBe(adminUser.lastname)
            expect(task.createdBy.firstname).toBe(adminUser.firstname)

            expect(task.assignedTo.id).toBe(adminUser.id)
            expect(task.assignedTo.lastname).toBe(adminUser.lastname)
            expect(task.assignedTo.firstname).toBe(adminUser.firstname)

            for (const tag of task.tags) {
                expect(tag.id).toBeDefined()
                expect(tag.code).toBeDefined()
                expect(tag.name).toBeDefined()
            }
        })

        it('Must return tasks', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })
           
            const taskPayloadStatus = projectTasksStatuses.find((i: any) => i.code === 'OPENED')
            const taskPayloadTags = projectTasksTags

            const taskPayload_1 = {
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: taskPayloadTags.map((i: any) => i.id),
                statusId: taskPayloadStatus.id,
            }
            const taskPayload_2 = {
                projectId: createProject,
                name: 'Test Task 2',
                description: 'Test Description 2',
                estimatedDateEnd: 2,
                estimatedDateStart: 2,
                estimatedDuration: 2,
                assignedToId: adminUser.id,
                tagsIds: taskPayloadTags.map((i: any) => i.id),
                statusId: taskPayloadStatus.id,
            }

            await utils.gqlCreateTask(taskPayload_1, adminAccessToken)
            await utils.gqlCreateTask(taskPayload_2, adminAccessToken)

            const { tasks } = await utils.gqlTasks()

            expect(tasks).toBeDefined()
            expect(tasks.data).toBeDefined()
            expect(tasks.meta).toBeDefined()

            expect(tasks.data).toHaveLength(2)
        })

        it('Must filter tasks by full text', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })
           
            const taskPayloadStatus = projectTasksStatuses.find((i: any) => i.code === 'OPENED')

            const taskPayload_1 = {
                projectId: createProject,
                name: 'Lorem ipsum pariatur velit',
                description: 'ipsum dolor sit amet, consectetur adipiscing elit',
                statusId: taskPayloadStatus.id,
            }
            const taskPayload_2 = {
                projectId: createProject,
                name: 'Lorem perspiciatis tempora',
                description: 'velit ipsum dolor sit amet, iste natus error',
                statusId: taskPayloadStatus.id,
            }
            const taskPayload_3 = {
                projectId: createProject,
                name: 'Task Name 3',
                description: 'Task Description 3',
                statusId: taskPayloadStatus.id,
            }

            await utils.gqlCreateTask(taskPayload_1, adminAccessToken)
            await utils.gqlCreateTask(taskPayload_2, adminAccessToken)
            await utils.gqlCreateTask(taskPayload_3, adminAccessToken)

            const { tasks: tasks_1_by_name } = await utils.gqlTasks({ fulltext: ['lorem iPsum'] })
            const { tasks: tasks_1_by_description } = await utils.gqlTasks({ fulltext: ['ConsectEtur'] })
            const { tasks: tasks_by_name } = await utils.gqlTasks({ fulltext: ['loRem'] })
            const { tasks: tasks_by_description } = await utils.gqlTasks({ fulltext: ['doLor'] })
            const { tasks: tasks_by_different } = await utils.gqlTasks({ fulltext: ['veLit'] })
            const { tasks: tasks_by_name_combined } = await utils.gqlTasks({ fulltext: ['pariaTUr', 'temPora'] })
            const { tasks: tasks_by_descriptions_combined } = await utils.gqlTasks({ fulltext: ['consectetur', 'natus'] })

            expect(tasks_1_by_name.data.map(i => i.name)).toEqual([taskPayload_1.name])
            expect(tasks_1_by_description.data.map(i => i.name)).toEqual([taskPayload_1.name])
            expect(tasks_by_name.data.map(i => i.name)).toEqual([taskPayload_2.name, taskPayload_1.name])
            expect(tasks_by_description.data.map(i => i.name)).toEqual([taskPayload_2.name, taskPayload_1.name])
            expect(tasks_by_different.data.map(i => i.name)).toEqual([taskPayload_2.name, taskPayload_1.name])
            expect(tasks_by_name_combined.data.map(i => i.name)).toEqual([taskPayload_2.name, taskPayload_1.name])
            expect(tasks_by_descriptions_combined.data.map(i => i.name))
                .toEqual([taskPayload_2.name, taskPayload_1.name])
        })

        it('Must return tasks of user', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })
           
            const taskPayloadStatus = projectTasksStatuses.find((i: any) => i.code === 'OPENED')
            const taskPayloadTags = projectTasksTags

            const taskPayload_1 = {
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: taskPayloadTags.map((i: any) => i.id),
                statusId: taskPayloadStatus.id,
            }
            const taskPayload_2 = {
                projectId: createProject,
                name: 'Test Task 2',
                description: 'Test Description 2',
                estimatedDateEnd: 2,
                estimatedDateStart: 2,
                estimatedDuration: 2,
                assignedToId: adminUser.id,
                tagsIds: taskPayloadTags.map((i: any) => i.id),
                statusId: taskPayloadStatus.id,
            }

            await utils.gqlCreateTask(taskPayload_1, adminAccessToken)
            await utils.gqlCreateTask(taskPayload_2, adminAccessToken)

            const { tasksOfCurrentUser } = await utils.gqlTasksOfCurrentUser(undefined, adminAccessToken)

            expect(tasksOfCurrentUser).toBeDefined()
            expect(tasksOfCurrentUser.data).toBeDefined()
            expect(tasksOfCurrentUser.meta).toBeDefined()

            expect(tasksOfCurrentUser.data).toHaveLength(2)
        })

        it('Must update task', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })

            const projectTasksTags_1 = projectTasksTags[0]
            const projectTasksTags_2 = projectTasksTags[1]

            const projectTasksStatuses_1 = projectTasksStatuses[0]
            const projectTasksStatuses_2 = projectTasksStatuses[1]

            const { createTask } = await utils.gqlCreateTask({
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: [projectTasksTags_1.id],
                statusId: projectTasksStatuses_1.id,
            }, adminAccessToken)

            const { task: createdTask } = await utils.gqlTask({
                id: createTask,
            })

            await utils.gqlUpdateTask({
                id: createdTask.id,
                version: createdTask.version,
                name: 'Test Task 2',
                description: 'Test Description 2',
                estimatedDateEnd: 2,
                estimatedDateStart: 2,
                estimatedDuration: 2,
                tagIds: [projectTasksTags_2.id],
                statusId: projectTasksStatuses_2.id,
            }, adminAccessToken)

            const { task: updatedTask } = await utils.gqlTask({
                id: createTask,
            })

            expect(updatedTask instanceof Object).toBeTruthy()

            expect(updatedTask.id).toBe(createTask)
            expect(updatedTask.createdAt).toBe(createdTask.createdAt)

            expect(updatedTask.name).toBe('Test Task 2')
            expect(updatedTask.description).toBe('Test Description 2')
            expect(updatedTask.estimatedDateEnd).toBe(2)
            expect(updatedTask.estimatedDateStart).toBe(2)
            expect(updatedTask.estimatedDuration).toBe(2)
            expect(updatedTask.version).toBe(createdTask.version + 1)
            expect(updatedTask.status.id).toBe(projectTasksStatuses_2.id)
            expect(updatedTask.status.code).toBe(projectTasksStatuses_2.code)
            expect(updatedTask.status.name).toBe(projectTasksStatuses_2.name)
            expect(updatedTask.tags).toEqual([{
                id: projectTasksTags_2.id,
                code: projectTasksTags_2.code,
                name: projectTasksTags_2.name,
            }])
        })
    })

    describe('GQL API Errors', () => {
        it('Must not update task', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: "Test Name 1",
                description: "Test Description 1",
                deadline: 1,
                budget: 1,
                members: [{
                    userId: adminUser.id,
                    roleCode: 'MANAGER',
                }],
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({ projectId: createProject })
            const { projectTasksStatuses } = await utils.gqlProjectTasksStatuses({ projectId: createProject })

            const projectTasksTags_1 = projectTasksTags[0]
            const projectTasksTags_2 = projectTasksTags[1]
            const projectTasksTags_3 = projectTasksTags[2]

            const projectTasksStatuses_1 = projectTasksStatuses[0]
            const projectTasksStatuses_2 = projectTasksStatuses[1]
            const projectTasksStatuses_3 = projectTasksStatuses[2]

            const { createTask } = await utils.gqlCreateTask({
                projectId: createProject,
                name: 'Test Task 1',
                description: 'Test Description 1',
                estimatedDateEnd: 1,
                estimatedDateStart: 1,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
                tagsIds: [projectTasksTags_1.id],
                statusId: projectTasksStatuses_1.id,
            }, adminAccessToken)

            const { task: createdTask } = await utils.gqlTask({
                id: createTask,
            })

            await utils.gqlUpdateTask({
                id: createdTask.id,
                version: createdTask.version,
                name: 'Test Task 2',
                description: 'Test Description 2',
                estimatedDateEnd: 2,
                estimatedDateStart: 2,
                estimatedDuration: 2,
                tagIds: [projectTasksTags_2.id],
                statusId: projectTasksStatuses_2.id,
            }, adminAccessToken)

            let error: any

            // Try to update task with same version
            try {
                await utils.gqlUpdateTask({
                    id: createdTask.id,
                    version: createdTask.version,
                    name: 'Test Task 3',
                    description: 'Test Description 3',
                    estimatedDateEnd: 3,
                    estimatedDateStart: 3,
                    estimatedDuration: 3,
                    tagIds: [projectTasksTags_3.id],
                    statusId: projectTasksStatuses_3.id,
                }, adminAccessToken)
            } catch (e) {
                error = e
            }

            const extensions = error?.response?.errors?.[0]?.extensions

            expect(extensions).toBeDefined()

            expect(extensions.code).toBe('TASK_001')
            expect(extensions.name).toBe('TASK_UPDATE_CONFLICT_ERROR')

            expect(extensions.metadata.id).toBeDefined()
            expect(extensions.metadata.conflictingProps).toBeDefined()

            const conflictingProps = extensions.metadata.conflictingProps

            expect(conflictingProps.name.old).toBe('Test Task 2')
            expect(conflictingProps.name.new).toBe('Test Task 3')
            expect(conflictingProps.description.old).toBe('Test Description 2')
            expect(conflictingProps.description.new).toBe('Test Description 3')
            expect(conflictingProps.estimatedDateEnd.old).toBe(2)
            expect(conflictingProps.estimatedDateEnd.new).toBe(3)
            expect(conflictingProps.estimatedDateStart.old).toBe(2)
            expect(conflictingProps.estimatedDateStart.new).toBe(3)
            expect(conflictingProps.estimatedDuration.old).toBe(2)
            expect(conflictingProps.estimatedDuration.new).toBe(3)
            expect(conflictingProps.statusId.old).toBe(projectTasksStatuses_2.id)
            expect(conflictingProps.statusId.new).toBe(projectTasksStatuses_3.id)
            expect(conflictingProps.tagIds.old).toEqual([projectTasksTags_2.id])
            expect(conflictingProps.tagIds.new).toEqual([projectTasksTags_3.id])
        })
    })
})
