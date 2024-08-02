import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDecimal, IsInt, IsNumber, IsPositive, Max } from 'class-validator';

@InputType()
export class CreateCompanyHasTreatmentInput {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    company_fk: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    treatment_fk: number;

    @Field(() => Number)
    @IsNumber()
    @IsPositive()
    value: number;

}
