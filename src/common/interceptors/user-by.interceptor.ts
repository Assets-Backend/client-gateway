import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class UserByInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const args = ctx.getArgs()

        const input = Object.keys(args)[0]
        const user:User = req.user
        const { user_id } = user

        const operation = ctx.getInfo().parentType.name

        if (!user || operation !== 'Mutation') return next.handle()

        // validar args[input] si es un objeto o no
        const isObject = typeof args[input] === 'object'

        isObject ? 
            // Si es un objeto
            args[input].updated_by = user_id
        :
            // Si no es un objeto
            args['updated_by'] = user_id
        ;

        return next.handle()
    }
}
