import { IsInt, IsPositive, Max } from 'class-validator';
import { CreatePatientInput } from './create-patient.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput extends PartialType(CreatePatientInput) {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    patient_id: number;
}
