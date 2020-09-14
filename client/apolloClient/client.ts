import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import fetch from 'isomorphic-fetch';
import { setContext } from 'apollo-link-context';
import cookies from "browser-cookies"
import commonEnv from "../utils/commonEnv";

let globalApolloClient = null;

const createApolloClient = (ctx) => {
    const uri = ctx ? `${ctx.req.protocol}://${ctx.req.headers.host}` : window.location.origin;
    const httpLink = new HttpLink({ uri: `${uri}/graphql`, fetch });
    const authLink = setContext((_, { headers }) => {
        const token = ctx ? ctx?.req?.cookies?.token : cookies.get('token');
        const headersData = {
            ...headers,
            token: token ? token : "",
        };

        return {
            headers: headersData
        }
    });

    return new ApolloClient({
        ssrMode: commonEnv.NODE,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export const initOnContext = (ctx) => {
    const inAppContext = Boolean(ctx.ctx);

    const apolloClient =
        ctx.apolloClient ||
        initApolloClient(ctx.ctx);

    apolloClient.toJSON = () => null;

    ctx.apolloClient = apolloClient;
    if (inAppContext) {
        ctx.ctx.apolloClient = apolloClient;
    }

    return ctx;
};

export const initApolloClient = (ctx) => {
    if (typeof window === 'undefined') {
        return createApolloClient(ctx);
    }

    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(ctx);
    }

    return globalApolloClient;
};
