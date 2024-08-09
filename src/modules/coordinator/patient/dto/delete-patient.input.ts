import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdatePatientInput } from './update-patient.input';

@InputType()
export class DeletePatientInput extends PickType(UpdatePatientInput, ['patient_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    patient_id: number;
}