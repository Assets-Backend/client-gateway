import { registerEnumType } from "@nestjs/graphql";

export enum fiscal_status {
    monotributista        = 'monotributista',
    responsable_inscripto = 'responsable_inscripto',
}

registerEnumType(fiscal_status, {
    name: 'fiscal_status', 
    description: 'Enumeración que representa los tipos fiscales.'
})