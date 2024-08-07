import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput, DeleteOrderDetailInput, UpdateOrderDetailInput } from './dto';
import { Inject, ParseIntPipe } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { User } from 'src/modules/auth/entities/user.entity';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';

@Resolver(() => OrderDetail)
export class OrderDetailResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'createOrderDetail' })
    async createOrderDetail(
        @CurrentUser() user: User,
        @Args('createOrderDetailInput') createOrderDetailInput: CreateOrderDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.create.orderDetail', {currentClient, createOrderDetailDto: createOrderDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Query(() => OrderDetail, { name: 'findOrderDetail' })
    async findOrder(
        @CurrentUser() user: User,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.orderDetail', {currentClient, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Query(() => [OrderDetail], { name: 'findOrderDetails' })
    async findOrderDetails(
        @CurrentUser() user: User,
        @Args('order_fk', { type: () => Int }, ParseIntPipe) order_fk: OrderDetail['order_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetail[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.orderDetails', {currentClient, whereInput: {order_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail[];
    }

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'updateOrderDetail' })
    async updateOrderDetail(
        @CurrentUser() user: User,
        @Args('updateOrderDetailInput') updateOrderDetailInput: UpdateOrderDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.update.orderDetail', {currentClient, updateOrderDetailDto: updateOrderDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Mutation(() => OrderDetail, { name: 'finalizeOrder' })
    async finalizeOrder(
        @CurrentUser() user: User,
        @Args('deleteOrderDetailInput') deleteOrderDetailInput: DeleteOrderDetailInput
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.finalize.orderDetail', {currentClient, deleteOrderDetailDto: deleteOrderDetailInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }
}
