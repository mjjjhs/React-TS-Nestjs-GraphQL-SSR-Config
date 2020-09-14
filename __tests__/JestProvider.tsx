import * as React from 'react';
import {Provider} from "react-redux";
import makeStore from "../client/store";

const JestProvider = (props)=> {
    const store = makeStore();
    const {children} = props;
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default JestProvider;