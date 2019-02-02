# Async Flows Middleware

Enhance `async await` thunks with `take` functionality and allow them to wait for redux actions.

Pause function execution waiting for user interactions to compose centralized `user flows`.

<div align="center">
    <a href="https://async-flows.now.sh/">
        <img alt="sample" style="width: 95%; border:thin solid black; color: black" src="https://raw.githubusercontent.com/ssaucedo/redux-async-flows/demo/public/async-flows.gif" />
    </a>
    <div>
        <a href="https://async-flows.now.sh/">(demo)</a>
    </div>
</div>

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

export const userFlow = () => async (dispatch, getState, take) => {
  dispatch(ui.showItems());                                   // UI
  const { payload: { item } } =
      await take(user.SELECT_ITEM);                           // User interaction  !!
  dispatch(actions.itemSelected(item));
  dispatch(ui.sidebarLoading(true));                          // UI
  dispatch(ui.openSidebar());                                 // UI
  const availableColors = await getAvailableColors(item);     // Service request
  if(item === 'shirts') {
    dispatch(actions.storeShirts(availableColors));           // Update state with retrieved data
  } else {
    dispatch(actions.storeJeans(availableColors));            // Update store
  }
  dispatch(ui.sidebarLoading(false));                         // UI
  await take(user.SELECT_COLOR);                              // User interaction !!
  dispatch(ui.closeSidebar());                                // UI
  dispatch(ui.openModal());                                   // UI
  await take(user.CONFIRMATION);                              // User interaction !!
  dispatch(ui.closeModal());                                  // UI
  dispatch(ui.resetState());                                  // UI

};

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

