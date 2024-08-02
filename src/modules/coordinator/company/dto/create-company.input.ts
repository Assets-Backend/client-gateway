import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {

    updated_by: number;

    @Field(() => String)
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(20)
    cuit?: string
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    note?: string;

}
