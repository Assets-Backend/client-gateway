import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { CreateOrderInput, UpdateOrderInput, DeleteOrderInput, CreateOrderDetailInput } from './dto';
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
import { OrderDetail } from './entities';

@Resolver(() => Order)
export class OrderResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => Order, { name: 'createOrder' })
    async createOrder(
        @CurrentUser() user: User,
        @Args('createOrderInput') createOrderInput: CreateOrderInput
    ): Promise<Order> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.create.order', {currentClient, createOrderDto: createOrderInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order;
    }

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
    @Query(() => OrderDetail, { name: 'findOrder' })
    async findOrder(
        @CurrentUser() user: User,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
    ): Promise<OrderDetail> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.order', {currentClient, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.client)
    @Query(() => [Order], { name: 'findOrders' })
    async findOrders(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Order[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.orders', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order[];
    }

    @Auth(user_types.client)
    @Mutation(() => Order, { name: 'updateOrder' })
    async updateOrder(
        @CurrentUser() user: User,
        @Args('updateOrderInput') updateOrderInput: UpdateOrderInput
    ): Promise<Order> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.update.order', {currentClient, updateOrderDto: updateOrderInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Order, { name: 'deleteOrder' })
    async deleteOrder(
        @CurrentUser() user: User,
        @Args('deleteOrderInput') deleteOrderInput: DeleteOrderInput
    ): Promise<Order> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.delete.order', {currentClient, deleteOrderDto: deleteOrderInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order;
    }
}
