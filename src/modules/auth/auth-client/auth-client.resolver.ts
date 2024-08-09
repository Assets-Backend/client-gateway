import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthClient } from './entities/auth-client.entity';
import { LoginClientInput, SignupClientInput } from './dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientResponse } from '../types/client-response.type';
import { catchError } from 'rxjs';
import { Auth } from '../decorators/composition/auth.decorator';
import { user_types } from '../enums/user_types.enum';
import { CurrentToken } from '../decorators';

@Resolver(() => AuthClient)
export class AuthClientResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Mutation(() => ClientResponse, { name: 'LoginClient' })
    async login(
        @Args('loginClientInput') loginClientInput: LoginClientInput
    ): Promise<ClientResponse>  {

        return this.client.send('auth.login.client', loginClientInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as ClientResponse;
    }

    @Auth(user_types.client)
    @Query(() => ClientResponse, { name: 'revalidateTokenClient' })
    async revalidateToken(
        @CurrentToken() token: string
    ): Promise<ClientResponse>  {

        return this.client.send('auth.verifyToken.client', token).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as ClientResponse;
    }
}
