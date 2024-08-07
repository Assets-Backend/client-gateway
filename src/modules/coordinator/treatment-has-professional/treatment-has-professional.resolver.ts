import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { TreatmentHasProfessional } from './entities/treatment-has-professional.entity';
import { CreateTreatmentHasProfessionalInput, UpdateTreatmentHasProfessionalInput, CompositeIdTreatmentInput } from './dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { User } from 'src/modules/auth/entities/user.entity';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';

@Resolver(() => TreatmentHasProfessional)
export class TreatmentHasProfessionalResolver {
 
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Query(() => TreatmentHasProfessional, { name: 'findTreatmentHasProfessional' })
    async findTreatmentHasProfessional(
        @CurrentUser() user: User,
        @Args('compositeIdTreatmentInput') compositeIdTreatmentInput: CompositeIdTreatmentInput,
    ): Promise<TreatmentHasProfessional> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.treatmentHasProfessional', {currentClient, compositeIdDto: compositeIdTreatmentInput})
        .pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as TreatmentHasProfessional;
    }

    @Auth(user_types.client)
    @Query(() => [TreatmentHasProfessional], { name: 'findTreatmentHasProfessionals' })
    async findTreatmentHasProfessionals(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<TreatmentHasProfessional[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.treatmentHasProfessionals', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as TreatmentHasProfessional[];
    }

    @Auth(user_types.client)
    @Mutation(() => TreatmentHasProfessional, { name: 'updateTreatmentHasProfessional' })
    async updateTreatmentHasProfessional(
        @CurrentUser() user: User,
        @Args('updateTreatmentHasProfessionalInput') updateTreatmentHasProfessionalInput: UpdateTreatmentHasProfessionalInput
    ): Promise<TreatmentHasProfessional> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.treatmentHasProfessional', {currentClient, updateTreatmentHasProfessionalDto: updateTreatmentHasProfessionalInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as TreatmentHasProfessional;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => TreatmentHasProfessional, { name: 'deleteTreatmentHasProfessional' })
    async deleteTreatmentHasProfessional(
        @CurrentUser() user: User,
        @Args('compositeIdTreatmentInput') compositeIdTreatmentInput: CompositeIdTreatmentInput,
    ): Promise<TreatmentHasProfessional> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.treatmentHasProfessional', {currentClient, compositeIdDto: compositeIdTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as TreatmentHasProfessional;
    }
}
