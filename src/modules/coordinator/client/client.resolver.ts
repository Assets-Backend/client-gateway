import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { AuthClient } from 'src/modules/auth/auth-client/entities/auth-client.entity';

@Resolver(() => Client)
export class ClientResolver {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Query(() => Client, { name: 'Client' })
    async Client(
        @CurrentUser() user: AuthClient
    ): Promise<Client> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;
        const { user_id } = user;

        return this.client.send('coordinator.find.user', {currentClient, user_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client;
    }

    @Auth(user_types.clientAdmin)
    @Query(() => [Client], { name: 'findUsers' })
    async findUsers(
        @CurrentUser() user: AuthClient,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Client[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.users', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client[];
    }

    @Auth(user_types.client)
    @Mutation(() => Client, { name: 'updateUser' })
    async updateUser(
        @CurrentUser() user: AuthClient,
        @Args('updateClientInput') updateClientInput: UpdateClientInput
    ): Promise<Client> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.user', {currentClient, updateClientDto: updateClientInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Client, { name: 'deleteUser' })
    async deleteUser(
        @CurrentUser() user: AuthClient,
        @Args('user_id', { type: () => Int }, ParseIntPipe) user_id: AuthClient['user_id']
    ): Promise<Client> {

        const currentClient: ClientIds = { mongo_id: user.id, client_id: user.user_id };

        return this.client.send('coordinator.delete.user', {currentClient, user_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client;
    }
}
