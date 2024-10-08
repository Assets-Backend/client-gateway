import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateClaimInput } from './create-claim.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClaimInput extends PartialType(CreateClaimInput) {
    
    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    claim_id: number;
}
