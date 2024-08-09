import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderDetail, OrderDetailProfessional } from './entities';
import { CreateDetailInput, DeleteDetailInput, UpdateDetailInput } from './dto';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';
import { AuthClient } from 'src/modules/auth/auth-client/entities/auth-client.entity';
import { AuthProfessional } from 'src/modules/auth/auth-professional/entities/auth-professional.entity';

@Resolver(() => OrderDetail)
export class OrderDetailClientResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'createDetail' })
    async create(
        @CurrentUser() user: AuthClient,
        @Args('createDetailInput') createDetailInput: CreateDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.create.detail', {currentClient, createDetailDto: createDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Query(() => OrderDetail, { name: 'findDetail' })
    async find(
        @CurrentUser() user: AuthClient,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.detail', {currentClient, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Query(() => [OrderDetail], { name: 'findDetailsByOrder' })
    async findDetailsByOrder(
        @CurrentUser() user: AuthClient,
        @Args('order_fk', { type: () => Int }, ParseIntPipe) order_fk: OrderDetail['order_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetail[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.findAll.details', {currentClient, whereInput: {order_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail[];
    }

    @Auth(user_types.client)
    @Query(() => [OrderDetail], { name: 'findDetailsByProfessional' })
    async findDetailsByProfessional(
        @CurrentUser() user: AuthClient,
        @Args('professional_fk', { type: () => Int }, ParseIntPipe) professional_fk: OrderDetail['professional_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetail[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.findAll.details', {currentClient, whereInput: {professional_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail[];
    }

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'updateDetail' })
    async update(
        @CurrentUser() user: AuthClient,
        @Args('updateDetailInput') updateDetailInput: UpdateDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.update.detail', {currentClient, updateDetailDto: updateDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'finalizeDetail' })
    async finalizeDetail(
        @CurrentUser() user: AuthClient,
        @Args('deleteDetailInput') deleteDetailInput: DeleteDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.finalize.detail', {currentClient, deleteDetailDto: deleteDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

}
