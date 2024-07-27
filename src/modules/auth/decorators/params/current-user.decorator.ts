import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
    (data: keyof User, context: ExecutionContext) => {
        
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user: User = data ? req.user[data] : req.user;

        if (!req.user)
            throw new InternalServerErrorException('User not found in request object (AuthGuard)');

        return req.user;
    }
)