import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateTreatmentInput } from './update-treatment.input';

@InputType()
export class DeleteTreatmentInput extends PickType(UpdateTreatmentInput, ['treatment_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    treatment_id: number;
}