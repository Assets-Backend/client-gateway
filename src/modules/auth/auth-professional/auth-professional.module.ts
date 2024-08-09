import { Module } from '@nestjs/common';
import { AuthProfessionalResolver } from './auth-professional.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule
    ],
    providers: [AuthProfessionalResolver],
})
export class AuthProfessionalModule {}
