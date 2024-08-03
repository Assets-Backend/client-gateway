import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNumber, IsPositive, Max } from 'class-validator';

@InputType()
export class CreateTreatmentHasProfessionalInput {

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

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    professional_fk: number;

    @Field(() => Number)
    @IsNumber()
    @IsPositive()
    value: number;
}
