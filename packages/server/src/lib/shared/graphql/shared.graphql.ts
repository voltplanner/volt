import { Type } from '@nestjs/common'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'

import { OrderEnum, PaginatedResponse } from '../interfaces/shared.interfaces'
import { TPaginatedMeta } from '../types/paginated-meta.type'

registerEnumType(OrderEnum, { name: 'OrderEnum' })

@InputType()
export class OrderByInput {
    @Field()
    field: string

    @Field(() => OrderEnum)
    order: OrderEnum
}

@ObjectType()
export class PaginatedMetaType implements TPaginatedMeta {
    @Field()
    curPage: number

    @Field()
    perPage: number

    @Field()
    total: number
}

export const PaginatedResponseType = <T>(
    classRef: Type<T>,
): Type<PaginatedResponse<T>> => {
    @ObjectType({ isAbstract: true })
    class PaginatedResponseType implements PaginatedResponse<T> {
        @Field(() => [classRef])
        data: T[]

        @Field(() => PaginatedMetaType)
        meta: PaginatedMetaType
    }

    return PaginatedResponseType
}
