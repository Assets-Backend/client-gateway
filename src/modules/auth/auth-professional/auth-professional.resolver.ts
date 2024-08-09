import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthProfessional } from './entities/auth-professional.entity';
import { LoginProfessionalInput, SignupProfessionalInput } from './dto';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ProfessionalResponse } from '../types/professional-response.type';
import { catchError } from 'rxjs';
import { Auth } from '../decorators/composition/auth.decorator';
import { user_types } from '../enums/user_types.enum';
import { CurrentToken } from '../decorators';

@Resolver(() => AuthProfessional)
export class AuthProfessionalResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Mutation(() => ProfessionalResponse, { name: 'SignupProfessional' })
    async signup(
        @Args('signupProfessionalInput') signupProfessionalInput: SignupProfessionalInput
    ): Promise<ProfessionalResponse>  {

        return this.client.send('auth.register.professional', signupProfessionalInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as ProfessionalResponse;
    }

    @Mutation(() => ProfessionalResponse, { name: 'LoginProfessional' })
    async login(
        @Args('loginProfessionalInput') loginProfessionalInput: LoginProfessionalInput
    ): Promise<ProfessionalResponse>  {

        return this.client.send('auth.login.professional', loginProfessionalInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as ProfessionalResponse;
    }

    @Auth(user_types.professional)
    @Query(() => ProfessionalResponse, { name: 'revalidateTokenProfessional' })
    async revalidateToken(
        @CurrentToken() token: string
    ): Promise<ProfessionalResponse>  {

        return this.client.send('auth.verifyToken.professional', token).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as ProfessionalResponse;
    }
}
