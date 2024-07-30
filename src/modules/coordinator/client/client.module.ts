import { Module } from '@nestjs/common';
import { ClientResolver } from './client.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [ClientResolver],
})
export class ClientModule {}
