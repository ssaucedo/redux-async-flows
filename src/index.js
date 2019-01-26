import React from "react";

import createAsyncFlowsMiddleware from "redux-async-flows";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

import Presentational from "./presentational";

const App = () => {
  const { take, asyncFlowsMiddleware } = createAsyncFlowsMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take)))
  );

  return (
    <Provider store={store}>
      <Presentational />
    </Provider>
  );
}


export default App;
