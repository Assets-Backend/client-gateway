import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Treatment {

    @Field(() => Int)
    treatment_id: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    abbreviation: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
