import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [CompanyResolver],
})
export class CompanyModule {}
