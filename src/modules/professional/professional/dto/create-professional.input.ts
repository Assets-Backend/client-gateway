import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateProfessionalInput {

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
}
