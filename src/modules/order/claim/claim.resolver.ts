import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Claim } from './entities/claim.entity';
import { CreateClaimInput, DeleteClaimInput, UpdateClaimInput } from './dto';
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

@Resolver(() => Claim)
export class ClaimResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => Claim, { name: 'createClaim' })
    async createClaim(
        @CurrentUser() user: AuthClient,
        @Args('createClaimInput') createClaimInput: CreateClaimInput
    ): Promise<Claim> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.create.claim', {currentClient, createClaimDto: createClaimInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim;
    }

    @Auth(user_types.client)
    @Query(() => Claim, { name: 'findClaim' })
    async findClaim(
        @CurrentUser() user: AuthClient,
        @Args('claim_id', { type: () => Int }, ParseIntPipe) claim_id: Claim['claim_id'],
    ): Promise<Claim> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.claim', {currentClient, claim_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim;
    }

    @Auth(user_types.client)
    @Query(() => [Claim], { name: 'findClaimsByDetail' })
    async findClaimsByDetail(
        @CurrentUser() user: AuthClient,
        @Args('detail_fk', { type: () => Int }, ParseIntPipe) detail_fk: Claim['detail_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Claim[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.claims', {currentClient, whereInput: {detail_fk}, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim[];
    }

    @Auth(user_types.client)
    @Query(() => [Claim], { name: 'findClaims' })
    async findClaims(
        @CurrentUser() user: AuthClient,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Claim[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.find.claims', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim[];
    }

    @Auth(user_types.client)
    @Mutation(() => Claim, { name: 'updateClaim' })
    async updateClaim(
        @CurrentUser() user: AuthClient,
        @Args('updateClaimInput') updateClaimInput: UpdateClaimInput
    ): Promise<Claim> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.update.claim', {currentClient, updateClaimDto: updateClaimInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Claim, { name: 'deleteClaim' })
    async deleteClaim(
        @CurrentUser() user: AuthClient,
        @Args('deleteClaimInput') deleteClaimInput: DeleteClaimInput
    ): Promise<Claim> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('order.delete.claim', {currentClient, deleteClaimDto: deleteClaimInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Claim;
    }
}
