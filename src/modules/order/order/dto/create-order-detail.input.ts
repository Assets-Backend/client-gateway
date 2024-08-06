import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, Min } from 'class-validator';

@InputType()
export class CreateOrderDetailInput {

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    order_fk?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    professional_fk?: number;

    @Field(() => Date)
    @IsDate()
    start_date: Date;
    
    @Field(() => Date)
    @IsDate()
    finish_date: Date;
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(31)
    total_sessions: number = 0;
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(0)
    sessions: number = 0;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    coinsurance: number = 0
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    value: number = 0
    
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    cost: number = 0
    
    @Field(() => Date, { nullable: true })
    @IsOptional()
    @IsDate()
    started_at?: Date
    
    @Field(() => Date, { nullable: true })
    @IsOptional()
    @IsDate()
    finished_at?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    requirements?: string
}
