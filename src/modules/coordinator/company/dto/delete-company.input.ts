import { IsInt, IsPositive, Max } from 'class-validator';
import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { UpdateCompanyInput } from './update-company.input';

@InputType()
export class DeleteCompanyInput extends PickType(UpdateCompanyInput, ['company_id', 'updated_by'] as const) {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    company_id: number;

}