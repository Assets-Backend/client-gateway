import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    order_id: number;

    updated_by: number;
}
