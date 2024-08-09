import { IsInt, IsPositive, Max } from 'class-validator';
import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {

    updated_by: number;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    company_id: number;
}
