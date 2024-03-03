import { Test } from '@nestjs/testing'

import { environment } from '../../environments/environment'
import { TaskProjectStatusRepository } from '../modules/task/repositories/task-project-status.repository'
import { OrderEnum } from '../shared/interfaces/shared.interfaces'
import { PrismaModule, PrismaService } from '../shared/prisma'

describe('Project Status', () => {
    let taskProjectStatusRepository: TaskProjectStatusRepository
    let prismaService: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                PrismaModule.forRoot({
                    url: environment.databaseUrl,
                }),
            ],
            providers: [TaskProjectStatusRepository],
        }).compile()

        taskProjectStatusRepository =
            moduleRef.get<TaskProjectStatusRepository>(TaskProjectStatusRepository)
        prismaService = moduleRef.get<PrismaService>(PrismaService)
    })

    afterEach(async () => {
        await prismaService.taskProjectStatus.deleteMany()
    })

    it('Should create statuses', async () => {
        const id = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })

        const ormEntity = await prismaService.taskProjectStatus.findUnique({
            where: { id, isDeleted: false },
        })

        expect(ormEntity).toBeDefined()
        expect(ormEntity?.name).toEqual('name_1')
        expect(ormEntity?.code).toEqual('code_1')
        expect(ormEntity?.description).toEqual('description_1')
        expect(ormEntity?.position).toEqual(0)
    })

    it('Should create statuses with correct position', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })

        const ormEntity_1 = await prismaService.taskProjectStatus.findUnique({
            where: { id: id_1, isDeleted: false },
        })
        const ormEntity_2 = await prismaService.taskProjectStatus.findUnique({
            where: { id: id_2, isDeleted: false },
        })

        expect(ormEntity_1?.position).toEqual(0)
        expect(ormEntity_2?.position).toEqual(1)
    })

    it('Should update statuses with position that highter then old', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        await taskProjectStatusRepository.update({
            id: id_2,
            position: 2,
        })

        const ormEntities = await prismaService.taskProjectStatus.findMany({
            where: { isDeleted: false },
        })

        expect(ormEntities.find((i) => i.id === id_1)?.position).toEqual(0)
        expect(ormEntities.find((i) => i.id === id_2)?.position).toEqual(2)
        expect(ormEntities.find((i) => i.id === id_3)?.position).toEqual(1)
    })

    it('Should update statuses with position that lower then old', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        await taskProjectStatusRepository.update({
            id: id_2,
            position: 0,
        })

        const ormEntities = await prismaService.taskProjectStatus.findMany({
            where: { isDeleted: false },
        })

        expect(ormEntities.find((i) => i.id === id_1)?.position).toEqual(1)
        expect(ormEntities.find((i) => i.id === id_2)?.position).toEqual(0)
        expect(ormEntities.find((i) => i.id === id_3)?.position).toEqual(2)
    })

    it('Should update status with isDeleted instead of deleting it', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })

        await taskProjectStatusRepository.delete({
            id: id_1,
        })

        const ormEntity = await prismaService.taskProjectStatus.findUnique({
            where: { id: id_1 },
        })

        expect(ormEntity?.isDeleted).toEqual(true)
    })

    it('Should not return deleted statuses', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        await taskProjectStatusRepository.delete({
            id: id_2,
        })

        const ormEntities = await taskProjectStatusRepository.findMany()

        expect(ormEntities.data).toHaveLength(2)
        expect(ormEntities.data.find((i) => i.id === id_1)).toBeDefined()
        expect(ormEntities.data.find((i) => i.id === id_2)).toBeUndefined()
        expect(ormEntities.data.find((i) => i.id === id_3)).toBeDefined()
    })

    it('Should return data filtered by name', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        const ormEntities = await taskProjectStatusRepository.findMany({
            filterByName: 'name_1',
        })

        expect(ormEntities.data).toHaveLength(1)
        expect(ormEntities.data.find((i) => i.id === id_1)).toBeDefined()
        expect(ormEntities.data.find((i) => i.id === id_2)).toBeUndefined()
        expect(ormEntities.data.find((i) => i.id === id_3)).toBeUndefined()
    })

    it('Should return data filtered by created date', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })

        await new Promise((r) => setTimeout(r, 100))
        const createdFrom = new Date()
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const createdTo = new Date()
        await new Promise((r) => setTimeout(r, 100))

        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        const ormEntitiesFrom = await taskProjectStatusRepository.findMany({
            filterByCreatedAt: {
                from: createdFrom,
            },
        })
        const ormEntitiesTo = await taskProjectStatusRepository.findMany({
            filterByCreatedAt: {
                to: createdTo,
            },
        })
        const ormEntitiesBoth = await taskProjectStatusRepository.findMany({
            filterByCreatedAt: {
                from: createdFrom,
                to: createdTo,
            },
        })

        expect(ormEntitiesBoth.data).toHaveLength(1)
        expect(ormEntitiesBoth.data.find((i) => i.id === id_1)).toBeUndefined()
        expect(ormEntitiesBoth.data.find((i) => i.id === id_2)).toBeDefined()
        expect(ormEntitiesBoth.data.find((i) => i.id === id_3)).toBeUndefined()

        expect(ormEntitiesFrom.data).toHaveLength(2)
        expect(ormEntitiesFrom.data.find((i) => i.id === id_1)).toBeUndefined()
        expect(ormEntitiesFrom.data.find((i) => i.id === id_2)).toBeDefined()
        expect(ormEntitiesFrom.data.find((i) => i.id === id_3)).toBeDefined()

        expect(ormEntitiesTo.data).toHaveLength(2)
        expect(ormEntitiesTo.data.find((i) => i.id === id_1)).toBeDefined()
        expect(ormEntitiesTo.data.find((i) => i.id === id_2)).toBeDefined()
        expect(ormEntitiesTo.data.find((i) => i.id === id_3)).toBeUndefined()
    })

    it('Should return paginated data', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        const ormEntities_1 = await taskProjectStatusRepository.findMany({
            perPage: 2,
            curPage: 1,
        })
        const ormEntities_2 = await taskProjectStatusRepository.findMany({
            perPage: 2,
            curPage: 2,
        })

        expect(ormEntities_1.data).toHaveLength(2)
        expect(ormEntities_1.data.find((i) => i.id === id_1)).toBeDefined()
        expect(ormEntities_1.data.find((i) => i.id === id_2)).toBeDefined()
        expect(ormEntities_1.data.find((i) => i.id === id_3)).toBeUndefined()
        expect(ormEntities_1.meta.total).toEqual(3)

        expect(ormEntities_2.data).toHaveLength(1)
        expect(ormEntities_2.data.find((i) => i.id === id_1)).toBeUndefined()
        expect(ormEntities_2.data.find((i) => i.id === id_2)).toBeUndefined()
        expect(ormEntities_2.data.find((i) => i.id === id_3)).toBeDefined()
        expect(ormEntities_2.meta.total).toEqual(3)
    })

    it('Should return ordered data', async () => {
        const id_1 = await taskProjectStatusRepository.create({
            name: 'name_1',
            code: 'code_1',
            description: 'description_1',
        })
        const id_2 = await taskProjectStatusRepository.create({
            name: 'name_2',
            code: 'code_2',
            description: 'description_2',
        })
        const id_3 = await taskProjectStatusRepository.create({
            name: 'name_3',
            code: 'code_3',
            description: 'description_3',
        })

        const ormEntities = await taskProjectStatusRepository.findMany({
            orderBy: {
                field: 'position',
                order: OrderEnum.DESC,
            },
        })

        expect(ormEntities.data[0].id).toEqual(id_3)
        expect(ormEntities.data[1].id).toEqual(id_2)
        expect(ormEntities.data[2].id).toEqual(id_1)
    })
})
