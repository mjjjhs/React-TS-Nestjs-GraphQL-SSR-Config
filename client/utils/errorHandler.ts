import {GraphQLError} from "graphql";

export const clientErrorHandler = (error): void => {
    const {graphQLErrors, networkError} = error;
    const isGraphQlError = !graphQLErrors || graphQLErrors.length === 0;
    let errors:GraphQLError = graphQLErrors;
    let errorMessage = '';
    let status = 0;
    if (isGraphQlError) errors = networkError ? networkError.result.errors : [];
    if (errors instanceof Array) {
        errors.map(({message = "", extensions = {exception: {status: 0}}}) => {
            const isExistExtensionsException = !!extensions && !!extensions.exception;
            status = isExistExtensionsException ? extensions.exception.status : 0;
            const statusMessage = status > 0 ? `status: ${extensions.exception.status}\n` : '';
            const stacktrace = isExistExtensionsException && extensions.exception.stacktrace instanceof Array ? extensions.exception.stacktrace : [];
            const stacktraceStrings = stacktrace.map(stack => {
                const stacktraceString = stack.split('(');
                return stacktraceString[0]
            });
            const stacktraceMessage = isExistExtensionsException ? stacktraceStrings.join('\n') : "";
            errorMessage += `error ${statusMessage}message: ${message}\n ${stacktraceMessage}`;
        });
        error.message = error?.message?.replace('GraphQL error: ', '');
    }

    if (status === 401) {
        sessionStorage.setItem('beforeUrl', window.location.pathname);
        window.location.replace('/login');
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(errorMessage);
    }
};

export const errorHandlerWithAlert = (error):void => {
    clientErrorHandler(error);
    alert(error.message);
};
