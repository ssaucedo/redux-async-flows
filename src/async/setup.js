import createAsyncFlowsMiddleware from 'redux-async-flows';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const { take, asyncFlowsMiddleware } = createAsyncFlowsMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take))
);