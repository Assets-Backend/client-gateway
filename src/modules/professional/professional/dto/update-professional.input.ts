import { CreateProfessionalInput } from './create-professional.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfessionalInput extends PartialType(CreateProfessionalInput) {}
