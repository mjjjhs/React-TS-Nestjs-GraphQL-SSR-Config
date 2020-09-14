import {IContext} from "../interfaces/ICommon";

const setHeaders = (context: IContext, header: object = {}) => {
    const target = context.token ? {token: context.token} : {};
    return {
        headers: Object.assign(target, header)
    };
};

export default setHeaders;
