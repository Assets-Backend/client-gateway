
import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    NATS_SERVERS: string[];
    CLIENT_DOMAIN: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    CLIENT_DOMAIN: joi.string().required(), 
})
.unknown(true)

// El "unknown" es para que no falle si hay variables de entorno que no estén definidas en el schema

const { error, value } = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS,
    clientDomain: envVars.CLIENT_DOMAIN,
};