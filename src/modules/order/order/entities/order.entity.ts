import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from './order-detail.entity';

@ObjectType()
export class Order {

    @Field(() => Int)
    order_id: number;
    
    @Field(() => Int)
    client_fk: number;

    @Field(() => Int)
    updated_by: number;
    
    @Field(() => Int)
    patient_fk: number;

    @Field(() => Int)
    company_fk: number;
    
    @Field(() => Int)
    treatment_fk: number;
    
    @Field(() => Int)
    frequency: number;

    @Field(() => String, { nullable: true })
    diagnosis?: string;

    // @Field(() => [OrderDetail], { nullable: true })
    // orderDetail?: OrderDetail[];

    @Field(() => String, { nullable: true })
    deleted_at?: Date;

    @Field(() => String)
    updated_at: Date;

    @Field(() => String)
    created_at: Date;
}
