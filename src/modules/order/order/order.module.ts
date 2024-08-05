import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [OrderResolver],
})
export class OrderModule {}
