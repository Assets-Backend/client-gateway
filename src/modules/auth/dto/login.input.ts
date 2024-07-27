import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsPhoneNumber, IsStrongPassword } from "class-validator";

@InputType()
export class LoginInput {

    // TODO: Validar con regex
    @Field( () => String, {nullable: true} )
    @IsOptional()
    @IsEmail()
    email?: string;

    // TODO: Validar con regex
    @Field( () => String, {nullable: true} )
    @IsOptional()
    @IsPhoneNumber('AR')
    phone?: string;
    
    // TODO: Validar con regex
    @Field( () => String )
    @IsStrongPassword()
    password: string;
}