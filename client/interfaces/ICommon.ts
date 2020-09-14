import {NextPageContext} from "next";
import {Store} from "../store";

export interface IAppContext extends NextPageContext {
    store: Store;
}