import { Test } from '@nestjs/testing'
import { environment } from './../environments/environment'
import { AuthUserStatusEnum, PrismaModule, PrismaService } from './shared/prisma'
import { ProjectsStatusService } from './modules/projects/services/projects-status.service'
import { ProjectsService } from './modules/projects/services/projects.service'
import { TasksStatusService } from './modules/tasks/services/tasks-status.service'
import { TasksTypeService } from './modules/tasks/services/tasks-type.service'
import { TasksService } from './modules/tasks/services/tasks.service'

describe('', () => {
    let projectsStatusService: ProjectsStatusService
    let tasksStatusService: TasksStatusService
    let tasksTypeService: TasksTypeService
    let projectsService: ProjectsService
    let prismaService: PrismaService
    let tasksService: TasksService

    let userId: string

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                PrismaModule.forRoot({
                    url: environment.databaseUrl,
                }),
            ],
            providers: [
                ProjectsStatusService,
                TasksStatusService,
                TasksTypeService,
                ProjectsService,
                TasksService,
            ],
        }).compile();

        projectsStatusService = moduleRef.get<ProjectsStatusService>(ProjectsStatusService);
        tasksStatusService = moduleRef.get<TasksStatusService>(TasksStatusService);
        tasksTypeService = moduleRef.get<TasksTypeService>(TasksTypeService);
        projectsService = moduleRef.get<ProjectsService>(ProjectsService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
        tasksService = moduleRef.get<TasksService>(TasksService);

        const allMethods = await prismaService.authMethod.findMany({
            select: {
                id: true,
            },
        })

        const role = await prismaService.authRole.create({
            data: {
                editable: true,
                name: '',
                superuser: true,
                permissions: {
                    createMany: {
                        data: allMethods.map((method) => ({
                            allowed: false,
                            methodId: method.id,
                            editable: true,
                        })),
                    },
                },
            },
        })

        const user = await prismaService.authUser.create({
            data: {
                email: '',
                firstname: '',
                lastname: '',
                role: {
                    connect: {
                        name: role.name,
                    },
                },
                completeCode: '',
                status: AuthUserStatusEnum.ACTIVE,
            },
        })

        userId = user.id
    })

    it('', async () => {
        const projectStatusId = await projectsStatusService.create({
            code: 'p_s_1_code',
            name: 'p_s_1_name'
        })

        const projectId = await projectsService.create({
            name: 'p_1_name',
            statusId: projectStatusId,
            userId,
        })

        const taskStatusId = await tasksStatusService.create({
            code: 'p_s_1_code',
            name: 'p_s_1_name',
            projectId,
        })
        const taskTypeId = await tasksTypeService.create({
            code: 'p_s_1_code',
            name: 'p_s_1_name',
            projectId,
        })

        const taskId_1 = await tasksService.create({
            createdById: userId,
            name: '1',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
        })
        const taskId_2 = await tasksService.create({
            createdById: userId,
            name: '2',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_1
        })
        const taskId_3 = await tasksService.create({
            createdById: userId,
            name: '3',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_1
        })
        const taskId_4 = await tasksService.create({
            createdById: userId,
            name: '4',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_1
        })
        const taskId_5 = await tasksService.create({
            createdById: userId,
            name: '5',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_2
        })
        const taskId_6 = await tasksService.create({
            createdById: userId,
            name: '6',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_3
        })
        const taskId_7 = await tasksService.create({
            createdById: userId,
            name: '7',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_3
        })
        const taskId_8 = await tasksService.create({
            createdById: userId,
            name: '8',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_3
        })
        const taskId_9 = await tasksService.create({
            createdById: userId,
            name: '9',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_4
        })
        const taskId_10 = await tasksService.create({
            createdById: userId,
            name: '10',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_5
        })
        const taskId_11 = await tasksService.create({
            createdById: userId,
            name: '11',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_5
        })
        const taskId_12 = await tasksService.create({
            createdById: userId,
            name: '12',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_7
        })
        const taskId_13 = await tasksService.create({
            createdById: userId,
            name: '13',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_7
        })
        const taskId_14 = await tasksService.create({
            createdById: userId,
            name: '14',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_7
        })
        const taskId_15 = await tasksService.create({
            createdById: userId,
            name: '15',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_9
        })
        const taskId_16 = await tasksService.create({
            createdById: userId,
            name: '16',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_9
        })


        const taskId_31 = await tasksService.create({
            createdById: userId,
            name: '31',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
        })
        const taskId_32 = await tasksService.create({
            createdById: userId,
            name: '32',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_31
        })
        const taskId_33 = await tasksService.create({
            createdById: userId,
            name: '33',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_31
        })
        const taskId_34 = await tasksService.create({
            createdById: userId,
            name: '34',
            projectId,
            statusId: taskStatusId,
            typeId: taskTypeId,
            parentId: taskId_33
        })

        await tasksService.delete({
            id: taskId_1,
        })

        // await tasksService.update({
        //     id: taskId_7,
        //     parentId: taskId_4,
        // })

        await tasksService.findMany()
    })
})
