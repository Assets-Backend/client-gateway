import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CompanyHasTreatment } from './entities/company-has-treatment.entity';
import { CreateCompanyHasTreatmentInput, UpdateCompanyHasTreatmentInput, CompositeIdCompanyInput } from './dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { CurrentUser } from 'src/modules/auth/decorators';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { catchError } from 'rxjs';
import { PaginationArgs } from 'src/common/dto';
import { AuthClient } from 'src/modules/auth/auth-client/entities/auth-client.entity';

@Resolver(() => CompanyHasTreatment)
export class CompanyHasTreatmentResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.clientAdmin)
    @Mutation(() => CompanyHasTreatment, { name: 'createCompanyHasTreatment' })
    async createCompanyHasTreatment(
        @CurrentUser() user: AuthClient,
        @Args('createCompanyHasTreatmentInput') createCompanyHasTreatmentInput: CreateCompanyHasTreatmentInput
    ): Promise<CompanyHasTreatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.create.companyHasTreatment', {currentClient, createCompanyHasTreatmentDto: createCompanyHasTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as CompanyHasTreatment;
    }

    @Auth(user_types.client)
    @Query(() => CompanyHasTreatment, { name: 'findCompanyHasTreatment' })
    async findCompanyHasTreatment(
        @CurrentUser() user: AuthClient,
        @Args('compositeIdCompanyInput') compositeIdCompanyInput: CompositeIdCompanyInput,
    ): Promise<CompanyHasTreatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.companyHasTreatment', {currentClient, compositeIdDto: compositeIdCompanyInput})
        .pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as CompanyHasTreatment;
    }

    @Auth(user_types.client)
    @Query(() => [CompanyHasTreatment], { name: 'findCompanyHasTreatments' })
    async findCompanyHasTreatments(
        @CurrentUser() user: AuthClient,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<CompanyHasTreatment[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.companyHasTreatments', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as CompanyHasTreatment[];
    }

    @Auth(user_types.client)
    @Mutation(() => CompanyHasTreatment, { name: 'updateCompanyHasTreatment' })
    async updateCompanyHasTreatment(
        @CurrentUser() user: AuthClient,
        @Args('updateCompanyHasTreatmentInput') updateCompanyHasTreatmentInput: UpdateCompanyHasTreatmentInput
    ): Promise<CompanyHasTreatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.companyHasTreatment', {currentClient, updateCompanyHasTreatmentDto: updateCompanyHasTreatmentInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as CompanyHasTreatment;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => CompanyHasTreatment, { name: 'deleteCompanyHasTreatment' })
    async deleteCompanyHasTreatment(
        @CurrentUser() user: AuthClient,
        @Args('compositeIdCompanyInput') compositeIdCompanyInput: CompositeIdCompanyInput,
    ): Promise<CompanyHasTreatment> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.companyHasTreatment', {currentClient, compositeIdDto: compositeIdCompanyInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as CompanyHasTreatment;
    }
}
