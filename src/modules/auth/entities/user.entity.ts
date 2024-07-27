import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { gender_options } from 'src/common/enums';
import { user_types } from 'src/modules/auth/enums/user_types.enum';

@ObjectType()
export class User {

    @Field(() => ID)
    id: number;

    @Field(() => Int)
    user_id: number;

    @Field(() => String)
    email: string

    @Field(() => String, { nullable: true })
    phone?: string

    password: string
    
    @Field(() => [user_types])
    roles: user_types[];

    @Field(() => gender_options)
    gender: gender_options;

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String, { nullable: true })
    last_login?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
