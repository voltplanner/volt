import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        return GqlExecutionContext.create(ctx).getContext().req.user
    },
)
