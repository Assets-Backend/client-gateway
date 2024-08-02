import { ObjectType, Field, Int } from '@nestjs/graphql';
import { gender_options } from 'src/common/enums';

@ObjectType()
export class Patient {

    @Field(() => Int)
    patient_id: number;    

    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    company_fk: number;

    @Field(() => Int)
    updated_by: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String, { nullable: true })
    healthcare_provider?: string;

    @Field(() => gender_options)
    gender: gender_options;

    @Field(() => Int, { nullable: true })
    age?: number;

    @Field(() => String, { nullable: true })
    phone?: string

    @Field(() => String, { nullable: true })
    note?: string;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
