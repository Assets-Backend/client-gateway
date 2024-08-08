import { registerEnumType } from "@nestjs/graphql";

export enum urgency_options {
    high = 'high',
    medium = 'medium',
    low = 'low'
}

registerEnumType(urgency_options, {
    name: 'urgency_options', 
    description: 'Enumeración que representa los tipos de emergencia para el reclamo.'
})