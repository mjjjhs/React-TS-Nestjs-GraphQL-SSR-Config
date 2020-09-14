import {NestFactory} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";
import detect from 'detect-port';
import cookieParser from "cookie-parser";
import * as Sentry from '@sentry/node';
import { urlencoded, json } from 'body-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
// import open from 'open';

import { AppModule } from './app.module';
import {logger} from "./logger/logger.middleware";

type ServerConnectFunction = (port: number) => Promise<void>;

const detectPort = async (connectServer: ServerConnectFunction, port: number): Promise<void> => {
    detect(port).then(_port => {
        if(port === _port) connectServer(port);
        else connectServer(_port);
    }).catch(err => {
        throw err;
    });
};

const setSwaggerModule = (server: NestExpressApplication): void => {
    const options = new DocumentBuilder()
        .setTitle('NEST-NEXT-CONFIG')
        .setDescription('nest-next configuration template for lqt-front')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(server, options);
    SwaggerModule.setup('swagger', server, document);
};

const initializeSentry = (nodeEnv: string): void => {
    const isDevMode: boolean = !nodeEnv || nodeEnv === 'development';
    if (!isDevMode) {
        Sentry.init({
            dsn: process.env.SENTRY_DSN
        });
    }
}

const bootstrap = async (): Promise<void> => {
    const server: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
    server.use(urlencoded({ extended: true }));
    server.use(json());
    server.useGlobalPipes(new ValidationPipe());
    server.use(cookieParser());
    server.use(logger);

    if(process.env.API_ENV !== 'production') setSwaggerModule(server);

    const port: number = Number(process.env.PORT) || 3000;
    const connectServer = async (port: number): Promise<void> => {
        await server.listen(port).then(() => console.log(`> 🚀 Ready on port ${port}...`));
        // if(!process.env.NODE_ENV) await open(`http://localhost:${port}`);
    };

    if(!process.env.NODE_ENV) await detectPort(connectServer, port);
    else await connectServer(port);
}

bootstrap().then(() => console.log(`> 🚀 Nest server executed successfully`));
