import { Module } from '@nestjs/common';
import { ClaimResolver } from './claim.resolver';
import { NatsModule } from 'src/transport/nats.module';

@Module({
    imports: [
        NatsModule
    ],
    providers: [ClaimResolver],
})
export class ClaimModule {}
