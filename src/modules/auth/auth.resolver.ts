import { Args, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { AuthResponse } from "./types/auth-response.type";
import { LoginInput, SignupInput } from "./dto";
import { NATS_SERVICE } from "src/config";
import { Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { CurrentToken } from "./decorators";
import { Auth } from "./decorators/composition/auth.decorator";
import { user_types } from "./enums/user_types.enum";

@Resolver(() => AuthResponse)
export class AuthResolver {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    @Query(() => String)
    sayHello(): string {
        return 'Hello, world!';
    }

    @Mutation(() => AuthResponse, { name: 'Login' })
    async loginUser(
        @Args('loginInput') loginInput: LoginInput
    ): Promise<AuthResponse>  {

        return this.client.send('auth.login.user', loginInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as AuthResponse;
    }

    @Mutation(() => AuthResponse, { name: 'SignupClient' })
    async signupClient(
        @Args('signupInput') signupInput: SignupInput
    ): Promise<AuthResponse>  {

        return this.client.send('auth.register.client', signupInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as AuthResponse;
    }

    @Mutation(() => AuthResponse, { name: 'SignupProfessional' })
    async signupProfessional(
        @Args('signupInput') signupInput: SignupInput
    ): Promise<AuthResponse>  {

        return this.client.send('auth.register.professional', signupInput).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as AuthResponse;
    }

    @Auth()
    @Query(() => AuthResponse, { name: 'revalidateToken' })
    async revalidateToken(
        @CurrentToken() token: string
    ): Promise<AuthResponse>  {

        return this.client.send('auth.verify.token', token).pipe(
            catchError(error => {
                throw new RpcException(error)
            })
        ) as unknown as AuthResponse;
    }
}