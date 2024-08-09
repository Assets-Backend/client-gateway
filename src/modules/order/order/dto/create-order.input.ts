import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateOrderInput {

    updated_by: number;
    
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    company_fk: number;
    
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    patient_fk: number;
    
    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    treatment_fk: number;
    
    @Field(() => Int)
    @IsInt()
    @Min(1)
    @Max(7)
    frequency: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    diagnosis?: string;
    
    // El decorador "ValidateNested" permite validar cada uno de los objetos del array con los decoradores de la clase OrderItemDto
    // @Field(() => CreateOrderDetailInput, { nullable: true })
    // @IsOptional()
    // @ValidateNested()
    // @Type(() => CreateOrderDetailInput)
    // order_detail?: CreateOrderDetailInput
}
