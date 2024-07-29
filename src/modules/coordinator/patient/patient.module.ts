import { Module } from '@nestjs/common';
import { PatientResolver } from './patient.resolver';

@Module({
    providers: [PatientResolver],
})
export class PatientModule {}
