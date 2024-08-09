import { Module } from '@nestjs/common';
import { ProfessionalResolver } from './professional.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [ProfessionalResolver],
})
export class ProfessionalModule {}
