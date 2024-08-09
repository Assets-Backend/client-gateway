import { Field, ObjectType } from "@nestjs/graphql";
import { AuthClient } from "../auth-client/entities/auth-client.entity";

@ObjectType()
export class ClientResponse {
    @Field( () => String )
    token: string;

    @Field( () => AuthClient )
    user: AuthClient;
}