import { PrismaServiceWithExtentionsType } from '..'

export type PrismaTransactionClientType = Omit<
    PrismaServiceWithExtentionsType,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>
