import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalInput, UpdateProfessionalInput } from './dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Auth } from 'src/modules/auth/decorators/composition/auth.decorator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { catchError } from 'rxjs';
import { CurrentUser } from 'src/modules/auth/decorators';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';
import { AuthProfessional } from 'src/modules/auth/auth-professional/entities/auth-professional.entity';

@Resolver(() => Professional)
export class ProfessionalResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Auth(user_types.professional)
    @Query(() => Professional, { name: 'Professional' })
    async Professional(
        @CurrentUser() user: AuthProfessional
    ): Promise<Professional> {

        const { user_id: professional_id } = user

        return this.client.send('professional.find.user', professional_id).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Professional;
    }

    @Auth(user_types.professional)
    @Mutation(() => Professional, { name: 'updateProfessional' })
    async updateProfessional(
        @CurrentUser() user: AuthProfessional,
        @Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput
    ): Promise<Professional> {

        const { user_id: professional_id } = user

        return this.client.send('professional.update.professional', {professional_id, updateProfessionalDto: updateProfessionalInput}).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as Professional;
    }
}
