import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateClaimInput } from './update-claim.input';

@InputType()
export class DeleteClaimInput extends PickType(UpdateClaimInput, ['claim_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    claim_id: number;
}