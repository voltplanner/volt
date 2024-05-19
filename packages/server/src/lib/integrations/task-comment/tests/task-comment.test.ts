
import { TaskIntegrationTaskCreateInput } from '../../task/types-input/task-integration-task-create.input-type'
import { setup as setupTest } from './support/global-setup'
import { teardown } from './support/global-teardown'
import { GlobalUtils } from './support/global-utils'

let setup: Awaited<ReturnType<typeof setupTest>>
let utils: GlobalUtils

describe('Task Comment', () => {
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
            await setup.prisma.taskComment.deleteMany()
        })

        afterAll(async () => {
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

        it('Must create task comment', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            const taskComment = await setup.prisma.taskComment.findUniqueOrThrow({
                where: { id: taskCommentCreate },
            })

            expect(taskComment.id).toBe(taskCommentCreate)
            expect(taskComment.text).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
            expect(taskComment.userId).toBe(adminUser.id)
        })

        it('Must update task comment', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            const { taskCommentUpdate } = await utils.gqlTaskCommentUpdate({
                id: taskCommentCreate,
                text: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
            }, adminAccessToken)

            const taskComment = await setup.prisma.taskComment.findUniqueOrThrow({
                where: { id: taskCommentUpdate },
            })

            expect(taskComment.id).toBe(taskCommentUpdate)
            expect(taskComment.text).toBe('Perspiciatis tempora velit ipsum dolor sit amet, iste natus error')
        })

        it('Must delete task comment', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            await utils.gqlTaskCommentDelete({
                id: taskCommentCreate,
            }, adminAccessToken)

            const taskComment = await setup.prisma.taskComment.findUnique({
                where: { id: taskCommentCreate },
            })

            expect(taskComment.isDeleted).toBe(true)
        })

        it('Must return task comments', async () => {
            const { adminUser, adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate: taskCommentCreate_1 } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            const { taskCommentCreate: taskCommentCreate_2 } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
            }, adminAccessToken)

            const { taskComments } = await utils.gqlTaskComments({
                taskId: taskId_1,
            }, adminAccessToken)

            expect(taskComments).toBeDefined()
            expect(taskComments.data).toBeDefined()
            expect(taskComments.meta).toBeDefined()
            expect(taskComments.data.map(i => i.id)).toEqual([taskCommentCreate_2, taskCommentCreate_1])

            for (const i of taskComments.data) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.text).toBe('string')
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

        it('Must return task comments paginated', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate: taskCommentCreate_1 } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)
            await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)
            await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            const { taskComments } = await utils.gqlTaskComments({
                taskId: taskId_1,
                curPage: 2,
                perPage: 2,
            }, adminAccessToken)

            expect(taskComments.meta).toBeDefined()
            expect(taskComments.meta.total).toBe(3)
            expect(taskComments.meta.curPage).toBe(2)
            expect(taskComments.meta.perPage).toBe(2)
            expect(taskComments.data.map(i => i.id)).toEqual([taskCommentCreate_1])
        })

        it('Must not return deleted task comments', async () => {
            const { adminAccessToken } = await utils.gqlGetAdminUser()

            const { taskCommentCreate: taskCommentCreate_1 } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }, adminAccessToken)

            const { taskCommentCreate: taskCommentCreate_2 } = await utils.gqlTaskCommentCreate({
                taskId: taskId_1,
                text: 'Perspiciatis tempora velit ipsum dolor sit amet, iste natus error',
            }, adminAccessToken)

            await utils.gqlTaskCommentDelete({
                id: taskCommentCreate_1,
            }, adminAccessToken)

            const { taskComments } = await utils.gqlTaskComments({
                taskId: taskId_1,
            }, adminAccessToken)

            expect(taskComments.data.map(i => i.id)).toEqual([taskCommentCreate_2])
        })
    })
})
