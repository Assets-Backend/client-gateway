import { registerEnumType } from "@nestjs/graphql";

export enum user_types {
    client       = 'client',
    professional = 'professional',
    clientAdmin  = 'clientAdmin',
}

registerEnumType(user_types, {
    name: 'user_types', 
    description: 'Enumeración que representa los diferentes tipos de usuarios del sistema: `client` (coordinadores) y "professional` (profesionales).'
})