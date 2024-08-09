import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateCompanyHasTreatmentInput } from './create-company-has-treatment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyHasTreatmentInput extends PartialType(CreateCompanyHasTreatmentInput) {

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
}
