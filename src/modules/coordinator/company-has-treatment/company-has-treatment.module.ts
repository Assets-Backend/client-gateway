import { Module } from '@nestjs/common';
import { CompanyHasTreatmentResolver } from './company-has-treatment.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [CompanyHasTreatmentResolver],
})
export class CompanyHasTreatmentModule {}
