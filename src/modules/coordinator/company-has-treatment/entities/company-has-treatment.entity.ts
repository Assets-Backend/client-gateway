import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyHasTreatment {

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    company_fk: number;

    @Field(() => Int)
    treatment_fk: number;

    @Field(() => Number)
    value: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
