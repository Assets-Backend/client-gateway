import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { user_types } from '../../enums/user_types.enum';
import { gender_options } from 'src/common/enums';

@ObjectType()
export class AuthProfessional {

    @Field(() => ID)
    id: string;

    @Field(() => Int)
    user_id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

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
