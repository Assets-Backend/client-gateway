import { ObjectType, Field, Int } from '@nestjs/graphql';
import { urgency_options } from 'src/common/enums/urgency_options.enum';

@ObjectType()
export class Claim {

    @Field(() => Int)
    claim_id: number;

    @Field(() => Int)
    detail_fk: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    cause: string;

    @Field(() => urgency_options)
    urgency: urgency_options;

    @Field(() => String)
    reported_date: Date;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
