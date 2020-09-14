import React, {useEffect, useReducer} from "react";
import {connect} from 'react-redux';
import {decrease, increase} from "../reducers/count";
// import {useImmerReducer} from 'use-immer';
import produce from "immer";

const initialState = {count: 0};

const reducer = (state, action) => {
    switch(action.type) {
        case 'reset':
            return produce(state, draft => {
                draft.count = 0;
            });
        case 'increment':
            return produce(state, draft => {
                draft.count += 1;
            });
        case 'decrement':
            return produce(state, draft => {
                draft.count -= 1;
            });
        default:
            return state;
    }
};

const Counter: React.FC = () => {
    // const [state, dispatch] = useImmerReducer(reducer, initialState);
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect(() => {throw new Error('Counter Error!!')}, []);

    return <div>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <span className={'count'}>{state.count}</span>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'reset'})}>RESET</button>
    </div>
};

const mapStateToProps = ({count}) => ({
    count
});

const mapDispatchToProps = {
    increase,
    decrease
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);