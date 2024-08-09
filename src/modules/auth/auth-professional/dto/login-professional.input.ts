import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsPhoneNumber, IsStrongPassword } from 'class-validator';

@InputType()
export class LoginProfessionalInput {

    @Field( () => String, {nullable: true} )
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field( () => String, {nullable: true} )
    @IsOptional()
    @IsPhoneNumber('AR')
    phone?: string;
    
    @Field( () => String )
    @IsStrongPassword()
    password: string;
}
