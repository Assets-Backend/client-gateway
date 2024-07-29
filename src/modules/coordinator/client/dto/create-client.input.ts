import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateClientInput {

    client_fk?: number;

    mongo_id: string;

    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsString()
    profile: string;
}
