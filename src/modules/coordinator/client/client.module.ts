import { Module } from '@nestjs/common';
import { ClientResolver } from './client.resolver';

@Module({
    providers: [ClientResolver],
})
export class ClientModule {}
