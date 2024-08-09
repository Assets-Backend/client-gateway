import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Professional {

    @Field(() => Int)
    professional_id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
