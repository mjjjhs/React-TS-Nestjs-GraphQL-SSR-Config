import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { GraphQLModule } from "@nestjs/graphql";
import * as Sentry from '@sentry/node';
import { Severity } from '@sentry/node';
import { FormatErrorWithContextExtension } from 'graphql-format-error-context-extension';
import {GraphQLError} from "graphql";
import NoIntrospection from 'graphql-disable-introspection';

import { GraphqlModules } from "./graphql/graphql.module";
import { AppController } from './app.controller';
import {IContext} from "./interfaces/ICommon";
import errorFormat from "./logger/formats/errorFormat";
import Logger from "./logger/logger.service";
import dbConfig from "./db.config";
import {SequelizeModule} from "@nestjs/sequelize";
import {LogsModule} from "./logs/logs.module";

const productionMode: boolean = process.env.API_ENV === "production" || process.env.API_ENV === "staging";
const isDevMode: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
if (!isDevMode) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN
    });
}

@Module({
    imports: [
        LogsModule,
        RenderModule.forRootAsync(
            Next({ dev: process.env.NODE_ENV !== 'production' }),
            {
                viewsDir: null
            }
        ),
        GraphqlModules,
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            installSubscriptionHandlers: true,
            playground: !productionMode,
            validationRules: isDevMode ? [] : [NoIntrospection],
            extensions: [() => new FormatErrorWithContextExtension((error: GraphQLError, context) => {
                const msg = errorFormat(error, context);
                Logger.error(msg, '');
                if (!isDevMode) {
                    Sentry.captureEvent({
                        message: `[${process.env.API_ENV.slice(0,4).toLocaleUpperCase()}] ${error?.message} / Path: ${error?.path?.join(', ')}`,
                        level: Severity.Critical,
                        contexts: {
                            header: context?.req?.headers,
                            body: context?.req?.body
                        }
                    });
                } else {
                    console.log(error, "error");
                }
                return error
            })],
            context: ({req}) => {
                const ip = req?.headers['x-forwarded-for'] || req?.connection?.remoteAddress;
                const token = req?.headers?.token || '';
                const timezone = req?.headers?.timezone || '';
                const useragent = req?.headers['user-agent'] || '';

                const newContext: IContext = {
                    token,
                    user: {token, ip, timezone, useragent}
                };
                return newContext;
            }
        }),
        SequelizeModule.forRoot(dbConfig(process.env.API_ENV)),
    ],
    controllers: [
        AppController,
    ],
})
export class AppModule {}
