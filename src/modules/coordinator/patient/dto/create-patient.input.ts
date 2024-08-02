import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator';
import { gender_options } from 'src/common/enums';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';

@InputType()
export class CreatePatientInput {

    clientUpdateBy: ClientIds;

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    company_fk: number;

    @Field(() => String)
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @Field(() => String)
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    last_name: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    healthcare_provider?: string;

    @Field(() => gender_options)
    @IsString()
    gender: gender_options;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(150)
    age?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    phone?: string
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    note?: string;
}
