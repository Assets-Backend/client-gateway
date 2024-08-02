import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput, UpdatePatientInput } from './dto';
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

@Resolver(() => Patient)
export class PatientResolver {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Query(() => Patient, { name: 'findPatient' })
    async findPatient(
        @CurrentUser() user: User,
        @Args('patient_id', { type: () => ID }, ParseIntPipe) patient_id: number,
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.patient', {currentClient, patient_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }

    @Auth(user_types.client)
    @Query(() => [Patient], { name: 'findPatients' })
    async findPatients(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Patient[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.patients', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient[];
    }

    @Auth(user_types.client)
    @Mutation(() => Patient, { name: 'updatePatient' })
    async updatePatient(
        @CurrentUser() user: User,
        @Args('updatePatientInput') updatePatientInput: UpdatePatientInput
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.patient', {currentClient, updatePatientDto: updatePatientInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Patient, { name: 'deletePatient' })
    async deletePatient(
        @CurrentUser() user: User,
        @Args('patient_id', { type: () => Int }, ParseIntPipe) patient_id: Patient['patient_id']
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.patient', {currentClient, patient_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }
}
