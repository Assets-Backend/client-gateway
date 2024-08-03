import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateTreatmentHasProfessionalInput } from './create-treatment-has-professional.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTreatmentHasProfessionalInput extends PartialType(CreateTreatmentHasProfessionalInput) {

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

    updated_by: number;
}
