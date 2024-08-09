import { Module } from '@nestjs/common';
import { OrderDetailClientResolver } from './order_detail_client.resolver';
import { OrderDetailProfessionalResolver } from './order_detail_professional.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule
    ],
    providers: [OrderDetailClientResolver, OrderDetailProfessionalResolver],
})
export class OrderDetailModule {}
