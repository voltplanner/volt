
import { TaskIntegrationTaskCreateInput } from '../../task/types-input/task-integration-task-create.input-type'
import { setup as setupTest } from './support/global-setup'
import { teardown } from './support/global-teardown'
import { GlobalUtils } from './support/global-utils'

let setup: Awaited<ReturnType<typeof setupTest>>
let utils: GlobalUtils

describe('Task Effort', () => {
    jest.setTimeout(5 * 60 * 1000)

    beforeAll(async () => {
        setup = await setupTest()
        utils = new GlobalUtils(setup)
    })

    afterAll(async () => {
        await teardown(setup)
    })

    describe('GQL API', () => {
        let projectId = ''

        let taskPayload_1: TaskIntegrationTaskCreateInput = {} as any
        let taskId_1 = ''

        afterEach(async () => {
            await setup.prisma.taskEffort.deleteMany()
        })

        afterAll(async () => {
            await setup.prisma.taskOnTaskTag.deleteMany()
            await setup.prisma.taskProjectOnUser.deleteMany()
            await setup.prisma.taskOnTaskRelation.deleteMany()
    
            await setup.prisma.taskAttachment.deleteMany()
            await setup.prisma.taskChange.deleteMany()
            await setup.prisma.taskEffort.deleteMany()
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

        beforeAll(async () => {
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

            const gqlProjectTasksStatuses = await utils.gqlProjectTasksStatuses({ projectId: createProject })

            projectId = createProject

            taskPayload_1 = {
                projectId,
                name: 'Lorem ipsum pariatur velit',
                description: 'ipsum dolor sit amet, consectetur adipiscing elit',
                statusId: gqlProjectTasksStatuses.projectTasksStatuses.find((i: any) => i.code === 'OPENED').id,
                estimatedDateStart: 50,
                estimatedDateEnd: 100,
                estimatedDuration: 1,
                assignedToId: adminUser.id,
            }

            const { taskCreate } = await utils.gqlTaskCreate(taskPayload_1, adminAccessToken)

            taskId_1 = taskCreate
        })

        it('Must create task effort', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            const taskEffort = await setup.prisma.taskEffort.findUniqueOrThrow({
                where: { id: taskEffortCreate },
            })

            expect(taskEffort.id).toBe(taskEffortCreate)
            expect(taskEffort.description).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            expect(taskEffort.value).toBe(1)
            expect(taskEffort.userId).toBe(adminUser.id)
        })

        it('Must update task effort', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            const { taskEffortUpdate } = await utils.gqlTaskEffortUpdate({
                id: taskEffortCreate,
                description: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
                value: 2,
            }, adminAccessToken)

            const taskEffort = await setup.prisma.taskEffort.findUniqueOrThrow({
                where: { id: taskEffortUpdate },
            })

            expect(taskEffort.id).toBe(taskEffortUpdate)
            expect(taskEffort.description).toBe('Perspiciatis tempora velit ipsum dolor sit amet, iste natus error')
            expect(taskEffort.value).toBe(2)
        })

        it('Must delete task effort', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            await utils.gqlTaskEffortDelete({
                id: taskEffortCreate,
            }, adminAccessToken)

            const taskEffort = await setup.prisma.taskEffort.findUnique({
                where: { id: taskEffortCreate },
            })

            expect(taskEffort.isDeleted).toBe(true)
        })

        it('Must return task efforts ms', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
                value: 2,
            }, adminAccessToken)

            const { task } = await utils.gqlTask({
                id: taskId_1,
            })

            expect(task.effortsMs).toBe(3)
        })

        it('Must return task efforts', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate: taskEffortCreate_1 } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            const { taskEffortCreate: taskEffortCreate_2 } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
                value: 2,
            }, adminAccessToken)

            const { taskEfforts } = await utils.gqlTaskEfforts({
                taskId: taskId_1,
            }, adminAccessToken)

            expect(taskEfforts).toBeDefined()
            expect(taskEfforts.data).toBeDefined()
            expect(taskEfforts.meta).toBeDefined()
            expect(taskEfforts.data.map(i => i.id)).toEqual([taskEffortCreate_2, taskEffortCreate_1])

            for (const i of taskEfforts.data) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.description).toBe('string')
                expect(typeof i.value).toBe('number')
                expect(typeof i.taskId).toBe('string')
                expect(typeof i.createdAt).toBe('number')
                expect(typeof i.updatedAt).toBe('number')

                expect(i.isCanUpdate).toBe(true)
                expect(i.isCanDelete).toBe(true)
                expect(i.user.id).toBe(adminUser.id)
                expect(i.user.lastname).toBe(adminUser.lastname)
                expect(i.user.firstname).toBe(adminUser.firstname)
            }
        })

        it('Must return task efforts paginated', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate: taskEffortCreate_1 } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)
            await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)
            await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            const { taskEfforts } = await utils.gqlTaskEfforts({
                taskId: taskId_1,
                curPage: 2,
                perPage: 2,
            }, adminAccessToken)

            expect(taskEfforts.meta).toBeDefined()
            expect(taskEfforts.meta.total).toBe(3)
            expect(taskEfforts.meta.curPage).toBe(2)
            expect(taskEfforts.meta.perPage).toBe(2)
            expect(taskEfforts.data.map(i => i.id)).toEqual([taskEffortCreate_1])
        })

        it('Must not return deleted task efforts', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskEffortCreate: taskEffortCreate_1 } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                value: 1,
            }, adminAccessToken)

            const { taskEffortCreate: taskEffortCreate_2 } = await utils.gqlTaskEffortCreate({
                taskId: taskId_1,
                description: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
                value: 2,
            }, adminAccessToken)

            await utils.gqlTaskEffortDelete({
                id: taskEffortCreate_1,
            }, adminAccessToken)

            const { taskEfforts } = await utils.gqlTaskEfforts({
                taskId: taskId_1,
            }, adminAccessToken)

            expect(taskEfforts.data.map(i => i.id)).toEqual([taskEffortCreate_2])
        })
    })
})
