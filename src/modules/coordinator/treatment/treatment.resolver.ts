import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Treatment } from './entities/treatment.entity';
import { CreateTreatmentInput, UpdateTreatmentInput, DeleteTreatmentInput } from './dto';
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

@Resolver(() => Treatment)
export class TreatmentResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.clientAdmin)
    @Mutation(() => Treatment, { name: 'createTreatment' })
    async createTreatment(
        @CurrentUser() user: User,
        @Args('createTreatmentInput') createTreatmentInput: CreateTreatmentInput
    ): Promise<Treatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.create.treatment', {currentClient, createTreatmentDto: createTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Treatment;
    }

    @Auth(user_types.client)
    @Query(() => Treatment, { name: 'findTreatment' })
    async findTreatment(
        @CurrentUser() user: User,
        @Args('treatment_id', { type: () => Int }, ParseIntPipe) treatment_id: Treatment['treatment_id'],
    ): Promise<Treatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.treatment', {currentClient, treatment_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Treatment;
    }

    @Auth(user_types.client)
    @Query(() => [Treatment], { name: 'findTreatments' })
    async findTreatments(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Treatment[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.treatments', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Treatment[];
    }

    @Auth(user_types.client)
    @Mutation(() => Treatment, { name: 'updateTreatment' })
    async updateTreatment(
        @CurrentUser() user: User,
        @Args('updateTreatmentInput') updateTreatmentInput: UpdateTreatmentInput
    ): Promise<Treatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.treatment', {currentClient, updateTreatmentDto: updateTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Treatment;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Treatment, { name: 'deleteTreatment' })
    async deleteTreatment(
        @CurrentUser() user: User,
        @Args('deleteTreatmentInput') deleteTreatmentInput: DeleteTreatmentInput
    ): Promise<Treatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.treatment', {currentClient, deleteTreatmentDto: deleteTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Treatment;
    }
}
