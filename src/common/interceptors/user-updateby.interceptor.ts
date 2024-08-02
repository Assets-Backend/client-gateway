import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ClientIds } from '../interfaces/client-ids.interface';

@Injectable()
export class UserUpdateByInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const args = ctx.getArgs()

        const input = Object.keys(args)[0]
        const user = req.user

        const operation = ctx.getInfo().parentType.name

        if (!user || operation !== 'Mutation') return next.handle()

        args[input].clientUpdateBy = { mongo_id: user.id, client_id: user.user_id } as ClientIds;

        return next.handle()
    }
}
