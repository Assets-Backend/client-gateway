import { ObjectType, Field, Int } from '@nestjs/graphql';
import { gender_options } from 'src/common/enums';
import { Client } from 'src/modules/coordinator/client/entities/client.entity';
import { Company } from 'src/modules/coordinator/company/entities/company.entity';
import { Patient } from 'src/modules/coordinator/patient/entities/patient.entity';
import { Treatment } from 'src/modules/coordinator/treatment/entities/treatment.entity';

@ObjectType()
export class OrderDetailCoordinator {


    // Paciente
    @Field(() => String)
    patient: Patient['name'];
    @Field(() => String, { nullable: true })
    healthcare_provider: Patient['healthcare_provider']
    @Field(() => Int, { nullable: true })
    age: Patient['age']
    @Field(() => gender_options)
    gender: Patient['gender']
    
    // Empresa
    @Field(() => String)
    company: Company['name']
    
    // Coordinador
    @Field(() => String)
    client: Client['name']
    
    // Prestacion
    @Field(() => String)
    treatment: Treatment['name']
    @Field(() => String)
    abbreviation: Treatment['abbreviation']
}
