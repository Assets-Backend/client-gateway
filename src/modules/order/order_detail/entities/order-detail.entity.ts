import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderDetail {

    @Field(() => Int)
    detail_id: number;

    @Field(() => Int)
    order_fk: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int, { nullable: true })
    professional_fk?: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    start_date: Date;

    @Field(() => String)
    finish_date: Date;

    @Field(() => Int)
    total_sessions: number;

    @Field(() => Int)
    sessions: number;

    @Field(() => Int)
    coinsurance: number

    @Field(() => Int)
    value: number

    @Field(() => Int)
    cost: number

    @Field(() => String, { nullable: true })
    started_at?: Date

    @Field(() => String, { nullable: true })
    finished_at?: Date

    @Field(() => String, { nullable: true })
    requirements?: string

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
