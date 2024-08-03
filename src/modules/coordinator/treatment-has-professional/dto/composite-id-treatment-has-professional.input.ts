import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateTreatmentHasProfessionalInput } from './update-treatment-has-professional.input';

@InputType()
export class CompositeIdTreatmentInput extends PickType(UpdateTreatmentHasProfessionalInput, ['company_fk', 'treatment_fk', 'professional_fk'] as const) {

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

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    professional_fk: number;
}