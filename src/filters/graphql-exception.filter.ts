import {
    ExceptionFilter,
    Catch,
} from '@nestjs/common';
import {serverErrorHandler} from "../../utils/errorHandler";

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
    catch(exception: unknown) {
        serverErrorHandler(exception);
    }
}
