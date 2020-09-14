import React from "react";
import App from "next/app";
import Head from "next/head";
import withRedux from 'next-redux-wrapper';
import {Provider} from 'react-redux';
import {enableES5} from "immer";
import getConfig from 'next/config';
import * as Sentry from "@sentry/browser";
import timeToInteractive, {EnvType} from "@lqt/tti";

import showGreeting from '../utils/greeting';
import makeStore from "../client/store";
import resetStyles from "../client/styles/ResetStyles";
import {IAppContext} from "../client/interfaces/ICommon";
import {withApollo} from "../client/apolloClient/withApollo";

const { publicRuntimeConfig } = getConfig();
const tti = new timeToInteractive(EnvType.DEV);

if (publicRuntimeConfig.NODE_ENV !== "dev") {
    Sentry.init({
        dsn: publicRuntimeConfig.SENTRY_DSN,
        environment: publicRuntimeConfig.NODE_ENV
    });
    Sentry.addBreadcrumb({
        message: `NODE_ENV: ${publicRuntimeConfig.NODE_ENV}`,
    });
}

class RootApp extends App<IAppContext> {
    public componentDidCatch (error, errorInfo) {
        if (publicRuntimeConfig.NODE_ENV !== "dev") {
            Sentry.withScope(scope => {
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key]);
                });
                Sentry.captureException(`[${process.env.API_ENV.slice(0,4).toLocaleUpperCase()}]${error}`);
            });
        }
    }

    public componentDidMount(): void {
        const agent: string = navigator.userAgent.toLowerCase();
        const isIE: boolean = (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1);
        if(isIE) enableES5();

        showGreeting(publicRuntimeConfig.NODE_ENV);

        window.onload = () => {
            tti.recordPerformanceItems();
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <>
                <Head>
                    <title>NEST-NEXT TEMPLATE</title>
                    <meta charSet='utf-8' />
                    {/* 파비콘 */}
                    {/*<link rel="shortcut icon" href={`${publicRuntimeConfig.IMAGE_URL}/favicon.png`} />*/}
                </Head>
                <Provider store={store}>
                    <Component {...pageProps} />
                    <style jsx>{resetStyles}</style>
                </Provider>
            </>
        );
    }
}

export default withApollo(withRedux(makeStore)(RootApp));
