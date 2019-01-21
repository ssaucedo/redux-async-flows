# Async Flows Middleware

Enhance `async await` thunks with `take` functionality and allow them to wait for redux actions.

Pause function execution waiting for user interactions to compose centralized `user flows`.

## How

[![Async Flows demo app](https://codesandbox.io/static/img/play-codesandbox.svg)](https://14x7xwv034.codesandbox.io/)

## The existing problem

With a thunk approach to handle side effects user flows ends up being composed by multiple thunks and that separation happens when an user interaction needs to take place to continue user flow execution.

Having the power to wait for an interaction we can unify those thunks to compose a single async function.

With thunks the dispatching order is not obvious. To discover existing `user flows` in sourcecode devs need to review the existing thunks, then go to presentational layer files and check which UI component is dispathing each thunk. With the repetition of the process they end up with `user flows` mental model.

## Install

```bash
    npm install redux-async-flows
```

## Setup

``` .js
import createAsyncFlowsMiddleware from 'redux-async-flows';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const {
    take,
    asyncFlowsMiddleware,
} = createAsyncFlowsMiddleware();

const store =
    createStore(() => {}, {}, applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take)));

```

## Async Flow

Instead of having a `user flow` definitions spread on different files and layers, `redux-async-flows` allows to express a complete user flow with `async await` functions.

``` .js

const userFlow = () => async function(dispatch, getState, take) {
    dispatch({ type: 'USER_STARTS_FLOW'});
    const res = await asyncService();         // Service call
    dispatch({ type: 'DISPLAY_RESULT'});      // UI update

    const confirmation = await take('USER_CONFIRMATION'); // user interaction

    // Handle interaction
    if(confirmation.accept) {
        // do something
        return;
    }

    if(confirmation.cancel) {
        // cancel and do something
        return;
    }
}

```

## Utils

### Wait for an action

```.js
await take('USER_SELECTS_FLIGHT');
```

### Wait for any action

```.js
await take.any('CREDIT_CARD_PAYMENT', 'OTHER_METHOD_PAYMENT');
```

### Wait for multiple actions

```.js
await take.all('CAPTCHA_CONFIRMATION', 'SMS_CONFIRMATION');
```

