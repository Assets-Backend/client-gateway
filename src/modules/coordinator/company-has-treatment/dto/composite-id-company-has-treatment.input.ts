import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateCompanyHasTreatmentInput } from './update-company-has-treatment.input';

@InputType()
export class CompositeIdInput extends PickType(UpdateCompanyHasTreatmentInput, ['company_fk', 'treatment_fk'] as const) {

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