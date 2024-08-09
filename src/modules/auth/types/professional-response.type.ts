import { Field, ObjectType } from "@nestjs/graphql";
import { AuthProfessional } from "../auth-professional/entities/auth-professional.entity";

@ObjectType()
export class ProfessionalResponse {
    @Field( () => String )
    token: string;

    @Field( () => AuthProfessional )
    user: AuthProfessional;
}