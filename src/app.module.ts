import { join } from 'path';
import { Module } from '@nestjs/common';
import { NatsModule } from './transport/nats.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { 
    AuthModule,
    ClientModule,
    PatientModule,
    CompanyModule,
    TreatmentModule
} from './modules';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: false,
            introspection: true, // Borrar cuando ya este listo para produccion
            plugins: [
                ApolloServerPluginLandingPageLocalDefault(),
            ],
        }),
        NatsModule,
        AuthModule,
        ClientModule,
        PatientModule,
        CompanyModule,
        TreatmentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}