import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Client {

    @Field(() => ID)
    client_id: number;

    @Field(() => Int, { nullable: true })
    client_fk?: number;

    @Field(() => String)
    mongo_id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String)
    profile: string;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
