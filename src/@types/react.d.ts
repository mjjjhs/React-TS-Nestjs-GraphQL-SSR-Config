import {FunctionComponent} from 'react'

declare module 'react' {
    import {NextPageContext} from "next";

    export interface NextFunctionComponent<P> extends FunctionComponent<P> {
        getInitialProps?(ctx: NextPageContext): Promise<P|any>
    }
}