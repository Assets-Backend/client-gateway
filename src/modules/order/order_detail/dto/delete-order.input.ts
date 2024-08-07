import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateOrderDetailInput } from './update-order-detail.input';

@InputType()
export class DeleteOrderDetailInput extends PickType(UpdateOrderDetailInput, ['detail_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    detail_id: number;
}