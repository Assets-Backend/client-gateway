import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateTreatmentInput } from './create-treatment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTreatmentInput extends PartialType(CreateTreatmentInput) {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    treatment_id: number;
}
