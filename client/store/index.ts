import {createStore, applyMiddleware, Store as ReduxStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReduxThunk from 'redux-thunk';
import reducers, {initialState} from '../reducers';

const middlewares: Array<any> = [];

if(process.env.NODE_ENV === 'development'){
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

middlewares.push(ReduxThunk);

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

export type Store = ReduxStore<typeof initialState>;

const makeStore = (state = initialState): Store => {
    return createStore(reducers, state, composeEnhancers(
        applyMiddleware(...middlewares),
    ));
};

export default makeStore;