import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput, UpdatePatientInput, DeletePatientInput } from './dto';
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

@Resolver(() => Patient)
export class PatientResolver {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.client)
    @Mutation(() => Patient, { name: 'createPatient' })
    async createPatient(
        @CurrentUser() user: AuthClient,
        @Args('createPatientInput') createPatientInput: CreatePatientInput
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.create.patient', {currentClient, createPatientDto: createPatientInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }

    @Auth(user_types.client)
    @Query(() => Patient, { name: 'findPatient' })
    async findPatient(
        @CurrentUser() user: AuthClient,
        @Args('patient_id', { type: () => Int }, ParseIntPipe) patient_id: Patient['patient_id'],
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.patient', {currentClient, patient_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }

    @Auth(user_types.client)
    @Query(() => [Patient], { name: 'findPatientsByCompany' })
    async findPatientsByCompany(
        @CurrentUser() user: AuthClient,
        @Args('company_fk', { type: () => Int }, ParseIntPipe) company_fk: Patient['company_fk'],
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Patient[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.findByCompany.patient', {currentClient, company_fk, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient[];
    }

    @Auth(user_types.client)
    @Query(() => [Patient], { name: 'findPatients' })
    async findPatients(
        @CurrentUser() user: AuthClient,
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
        @CurrentUser() user: AuthClient,
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
        @CurrentUser() user: AuthClient,
        @Args('deletePatientInput') deletePatientInput: DeletePatientInput
    ): Promise<Patient> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.patient', {currentClient, deletePatientDto: deletePatientInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Patient;
    }
}
