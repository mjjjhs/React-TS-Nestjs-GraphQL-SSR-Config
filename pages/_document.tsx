import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class RootDocument extends Document {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head lang={"ko"}/>
                <body>
                <Main /> {/* 라우트에 맞는 페이지가 렌더링 될 부분 */}
                <NextScript />
                </body>
            </Html>
        )
    }
}
