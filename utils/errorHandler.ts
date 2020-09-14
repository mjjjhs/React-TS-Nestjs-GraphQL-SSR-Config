import {ApolloError} from "apollo-server-core";

export interface IErrorObject {
    message?: string;
    id?: string | number;
    code?: string | number;
    status?: number;
    statusText?: string;
    request?: any;
}

export const serverErrorHandler = (errorParams) => {
    const {status} = errorParams;
    if(status && status !== 200) {
        const err:IErrorObject = {};
        const {data} = errorParams;
        const code = data?.code;
        const id = data?.id;
        const message = data?.message;
        err.message = message || errorParams.message;
        err.id = id;
        err.code = code;
        err.status = errorParams.status;
        err.statusText = errorParams.statusText;
        throw new ApolloError(err.message, String(err.status), err);
    }

    throw errorParams;
};
