import { ProjectIntegrationCreateProjectInput } from '../types-input/project-integration-project-create.input-type'
import { setup as setupTest } from './support/global-setup'
import { teardown } from './support/global-teardown'
import { GlobalUtils } from './support/global-utils'

let setup: Awaited<ReturnType<typeof setupTest>>
let utils: GlobalUtils

describe('Project', () => {
    jest.setTimeout(5 * 60 * 1000)

    beforeAll(async () => {
        setup = await setupTest()
        utils = new GlobalUtils(setup)
    })

    afterAll(async () => {
        await teardown(setup)
    })

    describe('GQL API', () => {
        afterEach(async () => {
            await setup.prisma.taskOnTaskTag.deleteMany()
            await setup.prisma.taskProjectOnUser.deleteMany()
            await setup.prisma.taskOnTaskRelation.deleteMany()

            await setup.prisma.taskUser.deleteMany()
            await setup.prisma.taskUserRole.deleteMany()
            await setup.prisma.taskTag.deleteMany()
            await setup.prisma.taskStatus.deleteMany()
            await setup.prisma.taskRelation.deleteMany()
            await setup.prisma.taskProject.deleteMany()
        })

        it('Must create project', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            expect(typeof createProject).toBe('string')
        })

        it('Must create project with users', async () => {
            const { adminUser } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
                members: [
                    {
                        userId: adminUser.id,
                        roleCode: 'MANAGER',
                    },
                ],
            })

            expect(typeof createProject).toBe('string')
        })

        it('Must return users of project', async () => {
            const { adminUser } = await utils.gqlGetAdminUser()

            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
                members: [
                    {
                        userId: adminUser.id,
                        roleCode: 'MANAGER',
                    },
                ],
            })

            const { projectUsers } = await utils.gqlProjectUsers({
                projectId: createProject,
            })

            expect(projectUsers instanceof Object).toBeTruthy()

            expect(projectUsers.data instanceof Array).toBeTruthy()
            expect(projectUsers.data).toHaveLength(1)

            expect(typeof projectUsers.data[0].id).toBe('string')
            expect(typeof projectUsers.data[0].firstname).toBe('string')
            expect(typeof projectUsers.data[0].lastname).toBe('string')

            expect(projectUsers.meta instanceof Object).toBeTruthy()
            expect(typeof projectUsers.meta.curPage).toBe('number')
            expect(typeof projectUsers.meta.perPage).toBe('number')
            expect(typeof projectUsers.meta.total).toBe('number')

            expect(projectUsers.data[0].id).toBe(adminUser.id)
        })

        it('Must return project', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { project } = await utils.gqlProject({ id: createProject })

            expect(project instanceof Object).toBeTruthy()

            expect(typeof project.id).toBe('string')
            expect(typeof project.createdAt).toBe('number')

            expect(project.name).toBe('Test Name 1')
            expect(project.description).toBe('Test Description 1')
            expect(project.deadline).toBe(1714332185805)
            expect(project.budget).toBe(100)
            expect(project.version).toBe(0)
        })

        it('Must return project user roles', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { projectUsersRoles } = await utils.gqlProjectUsersRoles({
                projectId: createProject,
            })

            expect(projectUsersRoles instanceof Array).toBeTruthy()

            for (const i of projectUsersRoles) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.code).toBe('string')
                expect(typeof i.name).toBe('string')
                expect(typeof i.position).toBe('number')
            }
        })

        it('Must return project tasks tags', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { projectTasksTags } = await utils.gqlProjectTasksTags({
                projectId: createProject,
            })

            expect(projectTasksTags instanceof Array).toBeTruthy()

            for (const i of projectTasksTags) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.code).toBe('string')
                expect(typeof i.name).toBe('string')
                expect(typeof i.position).toBe('number')
            }
        })

        it('Must return project tasks statuses', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { projectTasksStatuses } =
                await utils.gqlProjectTasksStatuses({
                    projectId: createProject,
                })

            expect(projectTasksStatuses instanceof Array).toBeTruthy()

            for (const i of projectTasksStatuses) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.code).toBe('string')
                expect(typeof i.name).toBe('string')
                expect(typeof i.position).toBe('number')
                expect(typeof i.isDefault).toBe('boolean')
            }
        })

        it('Must return project tasks relations', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { projectTasksRelations } =
                await utils.gqlProjectTasksRelations({
                    projectId: createProject,
                })

            expect(projectTasksRelations instanceof Array).toBeTruthy()

            for (const i of projectTasksRelations) {
                expect(typeof i.id).toBe('string')
                expect(typeof i.code).toBe('string')
                expect(typeof i.nameMain).toBe('string')
                expect(typeof i.nameForeign).toBe('string')
                expect(typeof i.position).toBe('number')
            }
        })

        it('Must update project', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1714332185805,
                budget: 100,
            })

            const { project } = await utils.gqlProject({
                id: createProject,
            })

            const { updateProject } = await utils.gqlUpdateProject({
                id: project.id,
                version: project.version,
                name: 'Test Name 2',
                description: 'Test Description 2',
                deadline: 1,
                budget: 1,
            })

            const { project: projectUpdated } = await utils.gqlProject({
                id: updateProject,
            })

            expect(typeof updateProject).toBe('string')

            expect(projectUpdated instanceof Object).toBeTruthy()

            expect(projectUpdated.id).toBe(createProject)
            expect(projectUpdated.createdAt).toBe(project.createdAt)

            expect(projectUpdated.name).toBe('Test Name 2')
            expect(projectUpdated.description).toBe('Test Description 2')
            expect(projectUpdated.deadline).toBe(1)
            expect(projectUpdated.budget).toBe(1)
            expect(projectUpdated.version).toBe(1)
        })
    })

    describe('GQL API Projects', () => {
        let projectPayload_1: ProjectIntegrationCreateProjectInput = {} as any
        let projectPayload_2: ProjectIntegrationCreateProjectInput = {} as any
        let projectPayload_3: ProjectIntegrationCreateProjectInput = {} as any
        let adminUserId = ''

        afterAll(async () => {
            await setup.prisma.taskOnTaskTag.deleteMany()
            await setup.prisma.taskProjectOnUser.deleteMany()
            await setup.prisma.taskOnTaskRelation.deleteMany()

            await setup.prisma.taskUser.deleteMany()
            await setup.prisma.taskUserRole.deleteMany()
            await setup.prisma.taskTag.deleteMany()
            await setup.prisma.taskStatus.deleteMany()
            await setup.prisma.taskRelation.deleteMany()
            await setup.prisma.taskProject.deleteMany()
        })

        beforeAll(async () => {
            const { adminUser } = await utils.gqlGetAdminUser()

            projectPayload_1 = {
                name: 'Lorem ipsum pariatur velit',
                description:
                    'ipsum dolor sit amet, consectetur adipiscing elit',
                deadline: 1,
                budget: 1,
            }
            projectPayload_2 = {
                name: 'Lorem perspiciatis tempora',
                description: 'velit ipsum dolor sit amet, iste natus error',
                deadline: 1,
                budget: 1,
                members: [{ userId: adminUser.id, roleCode: 'PERFORMER' }],
            }
            projectPayload_3 = {
                name: 'Project Name 3',
                description: 'Project Description 3',
                deadline: 1,
                budget: 1,
                members: [{ userId: adminUser.id, roleCode: 'MANAGER' }],
            }

            await utils.gqlCreateProject(projectPayload_1)
            await utils.gqlCreateProject(projectPayload_2)
            await utils.gqlCreateProject(projectPayload_3)

            adminUserId = adminUser.id
        })

        it('Must return projects', async () => {
            const { projects } = await utils.gqlProjects()

            expect(projects).toBeDefined()
            expect(projects.data).toBeDefined()
            expect(projects.meta).toBeDefined()
            expect(projects.data).toHaveLength(3)
        })

        it('Must return projects of current user', async () => {
            const accessToken = await utils.adminGetAccessToken()
            const { projectsOfCurrentUser } =
                await utils.gqlProjectsOfCurrentUser(accessToken)

            expect(projectsOfCurrentUser instanceof Object).toBeTruthy()
            expect(projectsOfCurrentUser.data instanceof Array).toBeTruthy()
            expect(projectsOfCurrentUser.data).toHaveLength(2)

            expect(typeof projectsOfCurrentUser.data[0].id).toBe('string')
            expect(typeof projectsOfCurrentUser.data[0].name).toBe('string')
            expect(typeof projectsOfCurrentUser.data[0].description).toBe(
                'string',
            )
            expect(typeof projectsOfCurrentUser.data[0].deadline).toBe('number')
            expect(typeof projectsOfCurrentUser.data[0].budget).toBe('number')
            expect(typeof projectsOfCurrentUser.data[0].version).toBe('number')
            expect(typeof projectsOfCurrentUser.data[0].createdAt).toBe(
                'number',
            )

            expect(projectsOfCurrentUser.meta instanceof Object).toBeTruthy()
            expect(typeof projectsOfCurrentUser.meta.curPage).toBe('number')
            expect(typeof projectsOfCurrentUser.meta.perPage).toBe('number')
            expect(typeof projectsOfCurrentUser.meta.total).toBe('number')
        })

        it('Must return filtered projects by name', async () => {
            const { projects } = await utils.gqlProjects({
                filterBy: { name: ['Lorem'] },
            })

            expect(projects?.data?.map((i) => i.name)).toEqual([
                projectPayload_2.name,
                projectPayload_1.name,
            ])
        })

        it('Must return filtered projects by user', async () => {
            const { projects } = await utils.gqlProjects({
                filterBy: { userId: [adminUserId] },
            })

            expect(projects?.data?.map((i) => i.name)).toEqual([
                projectPayload_3.name,
                projectPayload_2.name,
            ])
        })

        it('Must return filtered projects by full text', async () => {
            const { projects: projects_1_by_name } = await utils.gqlProjects({
                filterBy: { fulltext: ['lorem iPsum'] },
            })
            const { projects: projects_1_by_description } =
                await utils.gqlProjects({
                    filterBy: { fulltext: ['ConsectEtur'] },
                })
            const { projects: projects_by_name } = await utils.gqlProjects({
                filterBy: { fulltext: ['loRem'] },
            })
            const { projects: projects_by_description } =
                await utils.gqlProjects({ filterBy: { fulltext: ['doLor'] } })
            const { projects: projects_by_different } = await utils.gqlProjects(
                { filterBy: { fulltext: ['veLit'] } },
            )
            const { projects: projects_by_name_combined } =
                await utils.gqlProjects({
                    filterBy: { fulltext: ['pariaTUr', 'temPora'] },
                })
            const { projects: projects_by_descriptions_combined } =
                await utils.gqlProjects({
                    filterBy: { fulltext: ['consectetur', 'natus'] },
                })

            expect(projects_1_by_name.data.map((i) => i.name)).toEqual([
                projectPayload_1.name,
            ])
            expect(projects_1_by_description.data.map((i) => i.name)).toEqual([
                projectPayload_1.name,
            ])
            expect(projects_by_name.data.map((i) => i.name)).toEqual([
                projectPayload_2.name,
                projectPayload_1.name,
            ])
            expect(projects_by_description.data.map((i) => i.name)).toEqual([
                projectPayload_2.name,
                projectPayload_1.name,
            ])
            expect(projects_by_different.data.map((i) => i.name)).toEqual([
                projectPayload_2.name,
                projectPayload_1.name,
            ])
            expect(projects_by_name_combined.data.map((i) => i.name)).toEqual([
                projectPayload_2.name,
                projectPayload_1.name,
            ])
            expect(
                projects_by_descriptions_combined.data.map((i) => i.name),
            ).toEqual([projectPayload_2.name, projectPayload_1.name])
        })
    })

    describe('GQL API Errors', () => {
        afterEach(async () => {
            await setup.prisma.taskOnTaskTag.deleteMany()
            await setup.prisma.taskProjectOnUser.deleteMany()
            await setup.prisma.taskOnTaskRelation.deleteMany()

            await setup.prisma.taskUser.deleteMany()
            await setup.prisma.taskUserRole.deleteMany()
            await setup.prisma.taskTag.deleteMany()
            await setup.prisma.taskStatus.deleteMany()
            await setup.prisma.taskRelation.deleteMany()
            await setup.prisma.taskProject.deleteMany()
        })

        it('Must not update project', async () => {
            const { createProject } = await utils.gqlCreateProject({
                name: 'Test Name 1',
                description: 'Test Description 1',
                deadline: 1,
                budget: 1,
            })

            const { project } = await utils.gqlProject({
                id: createProject,
            })

            // Update project
            await utils.gqlUpdateProject({
                id: project.id,
                version: project.version,
                name: 'Test Name 2',
                budget: 2,
                deadline: 2,
                description: 'Test Description 2',
            })

            let error: any

            // Try to update project with same version
            try {
                await utils.gqlUpdateProject({
                    id: project.id,
                    version: project.version,
                    name: 'Test Name 3',
                    budget: 3,
                    deadline: 3,
                    description: 'Test Description 3',
                })
            } catch (e) {
                error = e
            }

            const extensions = error?.response?.errors?.[0]?.extensions

            expect(extensions).toBeDefined()

            expect(extensions.code).toBe('TASK_000')
            expect(extensions.name).toBe('TASK_PROJECT_UPDATE_CONFLICT_ERROR')

            expect(extensions.metadata.id).toBeDefined()
            expect(extensions.metadata.conflictingProps).toBeDefined()

            const conflictingProps = extensions.metadata.conflictingProps

            expect(conflictingProps.name).toBeDefined()
            expect(conflictingProps.budget).toBeDefined()
            expect(conflictingProps.deadline).toBeDefined()
            expect(conflictingProps.description).toBeDefined()

            expect(conflictingProps.name.old).toBe('Test Name 2')
            expect(conflictingProps.name.new).toBe('Test Name 3')
            expect(conflictingProps.budget.old).toBe(2)
            expect(conflictingProps.budget.new).toBe(3)
            expect(conflictingProps.deadline.old).toBe(2)
            expect(conflictingProps.deadline.new).toBe(3)
            expect(conflictingProps.description.old).toBe('Test Description 2')
            expect(conflictingProps.description.new).toBe('Test Description 3')
        })
    })
})
