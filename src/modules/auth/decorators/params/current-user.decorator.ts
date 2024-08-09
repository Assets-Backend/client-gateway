import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (data: keyof any, context: ExecutionContext) => {
        
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user = data ? req.user[data] : req.user;

        if (!user)
            throw new InternalServerErrorException('User not found in request object (AuthGuard)');

        return user;
    }
)