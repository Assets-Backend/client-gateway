import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString, IsStrongPassword } from "class-validator";
import { gender_options } from "src/common/enums";

@InputType()
export class SignupInput {

    @Field( () => Int )
    @IsNumber()
    @IsPositive()
    user_id: number;

    @Field( () => String )
    @IsString()
    name: string;

    @Field( () => String )
    @IsString()
    last_name: string;
    
    @Field( () => String )
    @IsEmail()
    email: string;

    @Field( () => String, {nullable: true} )
    @IsOptional()
    @IsPhoneNumber('AR')
    phone?: string;
    
    @Field( () => String )
    @IsStrongPassword()
    password: string;

    @Field( () => gender_options )
    @IsEnum(gender_options)
    gender: string;
}