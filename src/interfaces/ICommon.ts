export interface IDynamicStringObject {
    [key: string]: string
}

export interface IContext {
    token?: string;
    user?: IContextUser;
}

export interface IContextUser {
    token: string;
    ip: string;
    timezone: string;
    useragent: string;
}

export interface IApiResult {
    code: string;
    message: string;
}
