import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateDetailInput } from './create-detail.input';

@InputType()
export class UpdateDetailInput extends PartialType(CreateDetailInput) {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    detail_id: number;
}
