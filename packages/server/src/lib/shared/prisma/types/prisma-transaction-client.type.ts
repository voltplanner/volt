import { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma, PrismaClient } from "..";

export type PrismaTransactionClientType = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>
