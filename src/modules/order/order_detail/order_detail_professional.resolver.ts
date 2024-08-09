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
export class OrderDetailProfessionalResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.professional)
    @Mutation(() => OrderDetail, { name: 'acceptDetail' })
    async deletePatient(
        @CurrentUser() user: AuthProfessional,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
    ): Promise<OrderDetail> {

        const { user_id: professional_id } = user

        return this.client.send('order.accept.detail', {professional_id, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetail;
    }

    @Auth(user_types.professional)
    @Query(() => [OrderDetailProfessional], { name: 'getProfessionalDetails' })
    async getProfessionalDetails(
        @CurrentUser() user: AuthProfessional,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetailProfessional[]> {

        const { user_id: professional_id } = user

        return this.client.send('order.getDetails.detail', {professional_id, detail_id, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional[];
    }
    
    @Auth(user_types.professional)
    @Query(() => [OrderDetailProfessional], { name: 'getProfessionalDetail' })
    async getProfessionalDetail(
        @CurrentUser() user: AuthProfessional,
        @Args('detail_id', { type: () => Int }, ParseIntPipe) detail_id: OrderDetail['detail_id'],
    ): Promise<OrderDetailProfessional[]> {

        const { user_id: professional_id } = user

        return this.client.send('order.getDetail.detail', {professional_id, detail_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional[];
    }

    @Auth(user_types.professional)
    @Query(() => [OrderDetailProfessional], { name: 'findPendingOrders' })
    async findPendingOrders(
        @CurrentUser() user: AuthProfessional,
        @Args('client_fk', { type: () => Int }, ParseIntPipe) client_fk: OrderDetail['client_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<OrderDetailProfessional[]> {

        const { user_id: professional_id } = user

        return this.client.send('order.findPending.details', {client_fk, professional_id, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as OrderDetailProfessional[];
    }
}
