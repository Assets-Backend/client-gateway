import { Module } from '@nestjs/common';
import { OrderDetailResolver } from './order_detail.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule
    ],
    providers: [OrderDetailResolver],
})
export class OrderDetailModule {}
