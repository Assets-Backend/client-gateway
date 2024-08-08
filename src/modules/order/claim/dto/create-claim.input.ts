import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsInt, IsPositive, IsString, Max } from 'class-validator';
import { urgency_options } from 'src/common/enums/urgency_options.enum';

@InputType()
export class CreateClaimInput {

    @Field(() => Int)
    @IsInt()
    @IsPositive()
    @Max(2147483647)
    detail_fk: number;

    @Field(() => String)
    @IsString()
    cause: string;

    @Field(() => urgency_options)
    @IsString()
    urgency: urgency_options;

    @Field(() => Date)
    @IsDate()
    reported_date: Date;
}
