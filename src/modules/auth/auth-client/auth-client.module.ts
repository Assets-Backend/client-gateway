import { Module } from '@nestjs/common';
import { AuthClientResolver } from './auth-client.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule
    ],
    providers: [AuthClientResolver],
})
export class AuthClientModule {}
