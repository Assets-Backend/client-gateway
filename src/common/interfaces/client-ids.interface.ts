import { Field, ObjectType } from "@nestjs/graphql";
import { AuthClient } from "src/modules/auth/auth-client/entities/auth-client.entity";

@ObjectType()
export class ClientIds {

    @Field(() => String)
    mongo_id: AuthClient['id'];

    @Field(() => Number)
    client_id: AuthClient['user_id'];
}