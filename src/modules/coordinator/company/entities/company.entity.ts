import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Company {

    @Field(() => Int)
    company_id: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    cuit?: string;

    @Field(() => String, { nullable: true })
    note?: string;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
