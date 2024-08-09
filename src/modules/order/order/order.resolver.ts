import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { CreateOrderInput, UpdateOrderInput, DeleteOrderInput } from './dto';
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

@Resolver(() => Order)
export class OrderResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => Order, { name: 'createOrder' })
    async createOrder(
        @CurrentUser() user: AuthClient,
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
    @Query(() => [Order], { name: 'findOrdersByCompany' })
    async findOrdersByCompany(
        @CurrentUser() user: AuthClient,
        @Args('company_fk', { type: () => Int }, ParseIntPipe) company_fk: Order['company_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Order[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.orders', {currentClient, whereInput: {company_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order[];
    }

    @Auth(user_types.client)
    @Query(() => [Order], { name: 'findOrdersByPatient' })
    async findOrdersByPatient(
        @CurrentUser() user: AuthClient,
        @Args('patient_fk', { type: () => Int }, ParseIntPipe) patient_fk: Order['patient_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Order[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.orders', {currentClient, whereInput: {patient_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Order[];
    }

    @Auth(user_types.client)
    @Query(() => [Order], { name: 'findOrders' })
    async findOrders(
        @CurrentUser() user: AuthClient,
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
        @CurrentUser() user: AuthClient,
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
        @CurrentUser() user: AuthClient,
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
