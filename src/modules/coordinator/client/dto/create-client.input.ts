import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateClientInput {

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
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    profile: string;
}
