import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ClientIds } from 'src/common/interfaces/client-ids.interface';

@InputType()
export class CreateClientInput {

    clientUpdateBy: ClientIds;

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
