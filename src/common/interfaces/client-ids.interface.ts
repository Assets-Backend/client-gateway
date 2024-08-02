import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/modules/auth/entities/user.entity";

@ObjectType()
export class ClientIds {

    @Field(() => String)
    mongo_id: User['id'];

    @Field(() => Number)
    client_id: User['user_id'];
}