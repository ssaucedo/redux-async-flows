# Async Flows Middleware

Async Flows allows to enhance thunks with `take` functionality, which is no more than the
ability to wait for redux actions when using `async await`. With this you can pause function execution when waiting for an user interaction (or any redux action in your system).

In spite the middleware is useful by itself for an easy adoption the recomendation is to combine it with redux-thunks.

## Setup

``` .js
import createAsyncFlowsMiddleware from 'redux-async-flows';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

const {
    take,
    asyncFlowsMiddleware,
} = createAsyncFlowsMiddleware();

const store = createStore(() => {}, {}, applyMiddleware(asyncFlowsMiddleware, thunk.withExtraArgument(take)));

```

## Async Flow

``` .js

const userFlow = () => async function(dispatch, getState, take) {
    dispatch({ type: 'USER_STARTS_FLOW'});    // UI update
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

## Wait for an action

```.js
await take('USER_SELECTS_FLIGHT');
```

## Wait for any action

```.js
await take.any(CREDIT_CARD_PAYMENT, OTHER_METHOD_PAYMENT);
```

## Wait for multiple actions

```.js
await take.all(CAPTCHA_CONFIRMATION, SMS_CONFIRMATION);
```

