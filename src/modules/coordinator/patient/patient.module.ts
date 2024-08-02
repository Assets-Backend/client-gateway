import { Module } from '@nestjs/common';
import { PatientResolver } from './patient.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [PatientResolver],
})
export class PatientModule {}
