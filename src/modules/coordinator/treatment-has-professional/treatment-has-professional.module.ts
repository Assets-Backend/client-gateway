import { Module } from '@nestjs/common';
import { TreatmentHasProfessionalResolver } from './treatment-has-professional.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [TreatmentHasProfessionalResolver],
})
export class TreatmentHasProfessionalModule {}
