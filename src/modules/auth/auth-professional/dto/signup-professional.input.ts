import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { gender_options } from 'src/common/enums';

@InputType()
export class SignupProfessionalInput {

    @Field( () => String )
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @Field( () => String )
    @IsString()
    @MinLength(2)
    @MaxLength(100)
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
