import { IsInt, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderDetailInput } from './create-order-detail.input';

@InputType()
export class UpdateOrderDetailInput extends PartialType(CreateOrderDetailInput) {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    detail_id: number;
}
