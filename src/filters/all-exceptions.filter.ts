import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import {Severity} from '@sentry/node';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = (exception instanceof Error) ? exception.message : "INTERVAL_SERVER_ERROR";

        const isDevMode: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (!isDevMode) {
            Sentry.captureEvent({
                message: `[${process.env.API_ENV.slice(0,4).toLocaleUpperCase()}] ${exception?.message} / Path: ${exception?.path?.join(', ')}`,
                level: Severity.Critical,
            });
        } else {
            console.log(exception, "error");
        }

        response.status(statusCode).json({
            message,
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
