import * as jwt from 'jsonwebtoken';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { user_types } from '../enums/user_types.enum';
import { META_USER_TYPES } from '../decorators/function/role-protected.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ClientResponse } from '../types/client-response.type';
import { ProfessionalResponse } from '../types/professional-response.type';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector, 
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const ctx = GqlExecutionContext.create(context);
        const user_types: user_types[] = this.reflector.get(META_USER_TYPES, ctx.getHandler());
        
        const request = ctx.getContext().req;
        const token = this.extractTokenFromHeader(request);
        
        if (!token) throw new UnauthorizedException('Token not found');
        
        try {

            const { user, token: newToken } = await this.validateToken(token);

            if (!user_types || user_types.length === 0) {
                request['user'] = user
                request['token'] = newToken;
                return true;
            }

            this.validateUserType({
                userTypes: user.roles,
                requiredUserTypes: user_types
            })
            
            request['user'] = user
            request['token'] = newToken;

        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private validateUserType(params: {userTypes: user_types[], requiredUserTypes: user_types[]}): void {
        const { userTypes, requiredUserTypes } = params;
        const valid = userTypes.some(type => requiredUserTypes.includes(type));
        if (!valid) throw new UnauthorizedException("You don't have permission to access this resource.")
    }

    private async validateToken(token: string) {

        // Decodifica el token para ver el payload
        const { user_types: provider }: JwtPayload = jwt.decode(token);
        
        if (provider.includes(user_types.client)) return await firstValueFrom(
            this.client.send('auth.verifyToken.client', token)
        ) as ClientResponse

        if (provider.includes(user_types.professional)) return await firstValueFrom(
            this.client.send('auth.verifyToken.professional', token)
        ) as ProfessionalResponse

        throw new UnauthorizedException("You don't have permission to access this resource.")
    }
}
