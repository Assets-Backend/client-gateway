import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { User } from 'src/modules/auth/entities/user.entity';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';

@Resolver(() => Client)
export class ClientResolver {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Query(() => Client, { name: 'Client' })
    async Client(
        @CurrentUser() user: User
    ): Promise<Client> {

        return this.client.send('coordinator.find.user', {mongo_id: user.id, client_id: user.user_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client;
    }

    @Auth(user_types.clientAdmin)
    @Query(() => [Client], { name: 'findUsers' })
    async findUsers(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Client[]> {

        return this.client.send('coordinator.find.users', {mongo_id: user.id, client_id: user.user_id, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client[];
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Client, { name: 'deleteUser' })
    async deleteUser(
        @CurrentUser() user: User,
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id']
    ): Promise<Client> {

        return this.client.send('coordinator.delete.user', {mongo_id: user.id, client_id: user.user_id, user_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Client;
    }

}
