
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
                name: 'Test Task 2',
                description: 'Test Description 2',
                estimatedDateEnd: 2,
                estimatedDateStart: 2,
                estimatedDuration: 2,
                version: createdTask.version,
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
})
