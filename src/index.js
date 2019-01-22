import React from "react";
import ReactDOM from "react-dom";

import createAsyncFlowsMiddleware from "redux-async-flows";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

import Presentational from "./presentational";
import Source from './components/Source';

function App() {
  const { take, asyncFlowsMiddleware } = createAsyncFlowsMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take)))
  );

  return (
    <Provider store={store}>
      <div style={{fontFamily: 'sans-serif', textAlign: 'center' }}>
        <div style={{ display: "flex", height: '100%' }}>
        <div style={{ flex: "2" }}>
            <Source />
          </div>
          <div style={{ flex: "3" }}>
            <Presentational />
          </div>
        </div>
      </div>
    </Provider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
