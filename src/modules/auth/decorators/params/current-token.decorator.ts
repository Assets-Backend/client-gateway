import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        if (!req.token)
            throw new InternalServerErrorException('Token not found in request object (AuthGuard)');

        return req.token;
    }
)