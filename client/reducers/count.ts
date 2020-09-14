export const increase = () => ({ type: 'INCREASE' }) ;
export const decrease = () => ({ type: 'DECREASE' }) ;

interface ICounterState {
    count: number;
}
interface ICounterAction {
    type: string;
}

export const initialState = {
    count: 0,
};

const reducer = (state: ICounterState = initialState, action: ICounterAction): ICounterState => {
    const {type} = action;

    switch(type) {
        case 'INCREASE':
            return {...state, count: state.count + 1};
        case 'DECREASE':
            return {...state, count: state.count - 1};
        default:
            return state;
    }
};

export default reducer;