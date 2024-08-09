import { Field, ObjectType } from "@nestjs/graphql";
import { AuthProfessional } from "src/modules/auth/auth-professional/entities/auth-professional.entity";

@ObjectType()
export class ProfessionalIds {

    @Field(() => String)
    mongo_id: AuthProfessional['id'];

    @Field(() => Number)
    professional_id: AuthProfessional['user_id'];
}