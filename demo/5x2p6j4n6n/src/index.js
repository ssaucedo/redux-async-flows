import React from "react";
import ReactDOM from "react-dom";

import createAsyncFlowsMiddleware from "redux-async-flows";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";

import UserFlow from "./UserFlow";
import FlowRepresantation from "./tree";

import "./styles.css";

function App() {
  const { take, asyncFlowsMiddleware } = createAsyncFlowsMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take))
  );

  return (
    <Provider store={store}>
      <div className="App">
        <a href={"https://codesandbox.io/s/5x2p6j4n6n"}>
          {"Go to code sandbox"}
        </a>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <UserFlow />
          </div>
        </div>
      </div>
    </Provider>
  );
}
/**
 <div style={{ flex: "1" }}>
            <FlowRepresantation style={{ flex: "1" }} />
          </div>
 */
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
