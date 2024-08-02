import { Module } from '@nestjs/common';
import { TreatmentResolver } from './treatment.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [TreatmentResolver],
})
export class TreatmentModule {}
