import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, Min } from 'class-validator';

@InputType()
export class CreateOrderDetailInput {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    order_fk: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    professional_fk?: number;

    @Field(() => Date)
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en el formato "YYYY-MM-DD"' })
    start_date: Date;
    
    @Field(() => Date)
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en el formato "YYYY-MM-DD"' })
    finish_date: Date;
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(31)
    total_sessions: number = 0;
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsPositive()
    session: number = 0;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    coinsurance: number = 0
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    value: number = 0
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    cost: number = 0
    
    @Field(() => Date, { nullable: true })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en el formato "YYYY-MM-DD"' })
    started_at?: Date
    
    @Field(() => Date, { nullable: true })
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha debe estar en el formato "YYYY-MM-DD"' })
    finished_at?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    requirements?: string
}
