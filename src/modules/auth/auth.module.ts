import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transport/nats.module';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        NatsModule,
    ],
    providers: [AuthResolver],
    exports: [],
})
export class AuthModule {}
