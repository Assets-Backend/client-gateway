import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { UserUpdateByInterceptor } from './common/interceptors/user-updateby.interceptor';

async function bootstrap() {
    const logger = new Logger('main-gateway');

    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    app.useGlobalInterceptors(new UserUpdateByInterceptor());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );
    
    app.useGlobalFilters(new RpcCustomExceptionFilter())

    await app.listen(envs.port);

    logger.log(`Gateway running on port ${envs.port}`)
}
bootstrap();
