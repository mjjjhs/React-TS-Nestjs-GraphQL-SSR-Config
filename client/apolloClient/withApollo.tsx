import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import {initApolloClient, initOnContext} from "./client";

export const withApollo = PageComponent => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        let client;
        if (apolloClient) {
            // Happens on: getDataFromTree & next.js ssr
            client = apolloClient;
        } else {
            // Happens on: next.js csr
            client = initApolloClient(undefined);
        }

        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        );
    };

    WithApollo.getInitialProps = async (ctx) => {
        const inAppContext = Boolean(ctx.ctx);
        const { apolloClient } = initOnContext(ctx);

        let pageProps = {};
        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx);
        } else if (inAppContext) {
            pageProps = await App.getInitialProps(ctx);
        }

        if (typeof window === 'undefined') {
            const { AppTree } = ctx;
            if (ctx.res && ctx.res.finished) {
                return pageProps;
            }

            if (AppTree) {
                try {
                    const { getDataFromTree } = await import('@apollo/react-ssr');

                    let props;
                    if (inAppContext) {
                        props = { ...pageProps, apolloClient };
                    } else {
                        props = { pageProps: { ...pageProps, apolloClient } };
                    }

                    await getDataFromTree(<AppTree {...props} />);
                } catch (error) {
                    console.error('Error while running `getDataFromTree`', error);
                }

                Head.rewind();
            }
        }

        return {
            ...pageProps,
            apolloState: apolloClient.cache.extract(),
            apolloClient: ctx.apolloClient,
        };
    };

    return WithApollo;
};
