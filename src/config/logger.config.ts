import type { Params } from 'nestjs-pino';

export const loggerParams: Params = {
    pinoHttp:{
        quietResLogger: true,
        transport: {
            target: 'pino-pretty',
            options: {
                singleLine: true,
            },
        }
    }
};