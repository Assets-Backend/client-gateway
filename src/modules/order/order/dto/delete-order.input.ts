import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateOrderInput } from './update-order.input';

@InputType()
export class DeleteOrderInput extends PickType(UpdateOrderInput, ['order_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    order_id: number;

}