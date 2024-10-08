import { CreateClientInput } from './create-client.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
    
    updated_by: number;
}
