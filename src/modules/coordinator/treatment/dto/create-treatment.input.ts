import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTreatmentInput {

    updated_by: number;

    @Field(() => String)
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @Field(() => String)
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    abbreviation: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}
