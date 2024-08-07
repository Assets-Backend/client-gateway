import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { UserByInterceptor } from './common/interceptors/user-by.interceptor';

async function bootstrap() {
    const logger = new Logger('main-gateway');

    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: envs.clientDomain,
        credentials: true,
    });

    app.setGlobalPrefix('api');

    app.useGlobalInterceptors(new UserByInterceptor());

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
