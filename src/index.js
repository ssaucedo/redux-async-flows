import React from "react";
import ReactDOM from "react-dom";

import createAsyncFlowsMiddleware from "redux-async-flows";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

import Presentational from "./presentational";

const codeSandboxURL = "https://codesandbox.io/s/5x2p6j4n6n";

function App() {
  const { take, asyncFlowsMiddleware } = createAsyncFlowsMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take))
  );

  return (
    <Provider store={store}>
      <div style={{fontFamily: 'sans-serif', textAlign: 'center'}}>
        <a href={codeSandboxURL}>
          {"Go to code sandbox"}
        </a>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <Presentational />
          </div>
        </div>
      </div>
    </Provider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
