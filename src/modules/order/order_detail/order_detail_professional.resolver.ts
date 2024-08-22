import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrderDetailCoordinator, OrderDetailProfessional } from './entities';
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
import { Order } from '../order/entities/order.entity';
import { Patient } from 'src/modules/coordinator/patient/entities/patient.entity';
import { Client } from 'src/modules/coordinator/client/entities/client.entity';

@Resolver(() => OrderDetailProfessional)
export class OrderDetailProfessionalResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.professional)
    @Mutation(() => OrderDetailProfessional, { name: 'acceptOrderDetail' })
    async deletePatient(
        @CurrentUser() user: AuthProfessional,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetailProfessional['detail_id'],
    ): Promise<OrderDetailProfessional> {

        const { user_id: professional_id } = user

        return this.client.send('order.accept.detail', {professional_id, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional;
    }

    @Auth(user_types.professional)
    @Query(() => [OrderDetailProfessional], { name: 'getProfessionalDetails' })
    async getProfessionalDetails(
        @CurrentUser() user: AuthProfessional,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetailProfessional[]> {

        const { user_id: professional_id } = user

        return this.client.send('order.getDetails.detail', {professional_id, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional[];
    }
    
    @Auth(user_types.professional)
    @Query(() => OrderDetailProfessional, { name: 'getProfessionalDetail' })
    async getProfessionalDetail(
        @CurrentUser() user: AuthProfessional,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetailProfessional['detail_id'],
    ): Promise<OrderDetailProfessional> {

        const { user_id: professional_id } = user

        return this.client.send('order.getDetail.detail', {professional_id, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional;
    }

    @Auth(user_types.professional)
    @Query(() => [OrderDetailProfessional], { name: 'findPendingOrders' })
    async findPendingOrders(
        @CurrentUser() user: AuthProfessional,
        @Args('client_fk', { type: () => Int }, ParseIntPipe) client_fk: OrderDetailProfessional['client_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetailProfessional[]> {

        const { user_id: professional_id } = user

        return this.client.send('order.findPending.details', {client_fk, professional_id, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional[];
    }

    @Auth(user_types.professional)
    @ResolveField(() => Order, {name: 'Order'})
    async Order(
        @Parent() order: OrderDetailProfessional
    ): Promise<number> {

        const { order_fk: order_id } = order;
            
        return this.client.send('order.find.order', { order_id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as number;

    }

    @Auth(user_types.professional)
    @ResolveField(() => OrderDetailCoordinator, {name: 'Client'})
    async Client(
        @Parent() order: OrderDetailProfessional
    ): Promise<number> {

        const { order_fk, client_fk: client_id } = order;
            
        return this.client.send('coordinator.findByOrder.coordinator', { order_fk, client_id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as number;
    }


}
