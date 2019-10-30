import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import saga from './saga';

export const ADD_TODO = 'ADD_TODO';
export const WEATHER_FETCH_SUCCEEDED = 'WEATHER_FETCH_SUCCEEDED';
export const WEATHER_FETCH_REQUESTED = 'WEATHER_FETCH_REQUESTED';
export const WEATHER_FETCH_FAILED = 'WEATHER_FETCH_FAILED';

const initialStore = {
    loading: false,
    todo: ['React Redux'],
    weather: {},
};

export interface ITodoAction {
    text?: string;
    type: typeof ADD_TODO | typeof WEATHER_FETCH_REQUESTED | typeof WEATHER_FETCH_SUCCEEDED;
    data?: any;
}

function todos(state = initialStore, action: ITodoAction) {
    console.log('test', state, action);
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todo: [...state.todo, action.text] };
        case WEATHER_FETCH_REQUESTED:
            return { ...state, loading: true };
        case WEATHER_FETCH_SUCCEEDED:
            return { ...state, loading: false, weather: action.data };
        default:
            return state
    }
}
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(todos, initialStore, applyMiddleware(sagaMiddleware));

store.dispatch({
    text: 'Read the docs',
    type: 'ADD_TODO',
});

// USER_FETCH_REQUESTED
sagaMiddleware.run(saga)

store.dispatch({
    type: WEATHER_FETCH_REQUESTED,
});

console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]