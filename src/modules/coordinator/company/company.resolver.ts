import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Company } from './entities/company.entity';
import { CreateCompanyInput, UpdateCompanyInput, DeleteCompanyInput } from './dto';
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

@Resolver(() => Company)
export class CompanyResolver {
  
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.clientAdmin)
    @Mutation(() => Company, { name: 'createCompany' })
    async createCompany(
        @CurrentUser() user: User,
        @Args('createCompanyInput') createCompanyInput: CreateCompanyInput
    ): Promise<Company> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.create.company', {currentClient, createCompanyDto: createCompanyInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Company;
    }

    @Auth(user_types.client)
    @Query(() => Company, { name: 'findCompany' })
    async findCompany(
        @CurrentUser() user: User,
        @Args('company_id', { type: () => Int }, ParseIntPipe) company_id: Company['company_id'],
    ): Promise<Company> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.company', {currentClient, company_id}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Company;
    }

    @Auth(user_types.client)
    @Query(() => [Company], { name: 'findCompanies' })
    async findCompanies(
        @CurrentUser() user: User,
        @Args() paginationArgs: PaginationArgs,
    ): Promise<Company[]> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.find.companies', {currentClient, paginationDto: paginationArgs}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Company[];
    }

    @Auth(user_types.client)
    @Mutation(() => Company, { name: 'updateCompany' })
    async updateCompany(
        @CurrentUser() user: User,
        @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
    ): Promise<Company> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.update.company', {currentClient, updateCompanyDto: updateCompanyInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Company;
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Company, { name: 'deleteCompany' })
    async deleteCompany(
        @CurrentUser() user: User,
        @Args('deleteCompanyInput') deleteCompanyInput: DeleteCompanyInput
    ): Promise<Company> {

        const { current_client: currentClient }: { current_client: ClientIds } = user;

        return this.client.send('coordinator.delete.company', {currentClient, deleteCompanyDto: deleteCompanyInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Company;
    }

    @Auth(user_types.client)
    @ResolveField(() => Int, {name: 'totalPatients'})
    async totalPatients(
        @Parent() company: Company
    ): Promise<number> {

        const { company_id } = company;
            
        return this.client.send('coordinator.totalPatients.patients', { company_id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as number;

    }

    @Auth(user_types.client)
    @ResolveField(() => Int, {name: 'totalOrders'})
    async totalOrders(
        @Parent() company: Company
    ): Promise<number> {

        const { company_id } = company;
            
        return this.client.send('order.totalOrders.orderDetail', { company_id }).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as number;

    }
}
