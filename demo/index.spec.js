import { createStore, applyMiddleware } from "redux";
import testFlow from "./flows";
import reducer from "./reducers";
import {
  userInteractions as user,
  uiUpdates as ui,
  selectFlight,
  creditCardPayment,
  otherMethodsPayment,
  cancelBooking
} from "./actions";

import createAsyncForFlowsMiddleware from "../src/index";


const step = (take, dispatch) => async (interactionType, userInteraction) => {
  const prom = take(interactionType); // take interaction
  dispatch(userInteraction()); // user interacts
  await prom; // wait for take resolution
}

describe("enhanced store", () => {
  it("should work well", async () => {
    const {
      take,
      middleware: asyncMiddleware
    } = createAsyncForFlowsMiddleware();

    const { dispatch, getState } = createStore(
      reducer,
      applyMiddleware(asyncMiddleware)
    );

    const takeStep = step(take, dispatch);

    const spiedTake = jest.fn(take);
    const spiedDispatch = jest.fn(dispatch);
    const flowPromise = testFlow(spiedTake, getState, spiedDispatch)();

    await takeStep(user.USER_SELECTS_FLIGHT, selectFlight);
    
    expect(spiedTake.mock.calls[0][0]).toEqual(
      user.USER_SELECTS_FLIGHT
    );

    expect(spiedDispatch.mock.calls[0][0]).toEqual({
      type: ui.DISPLAY_FLIGHT_DETAILS
    });

    expect(spiedTake.mock.calls[1][0]).toEqual(
      user.CREDIT_CARD_PAYMENT
    );

    expect(spiedTake.mock.calls[2][0]).toEqual(
      user.OTHER_METHOD_PAYMENT
    );

    await takeStep(user.CREDIT_CARD_PAYMENT, creditCardPayment);

    await flowPromise;

    expect(spiedDispatch.mock.calls[1][0]).toEqual({
      type: ui.SHOW_PAYMENT_METHODS,
      payload: { method: "credit card" }
    });

    expect(spiedDispatch.mock.calls[2][0]).toEqual({
      type: ui.BOOKING_SUCCESS
    });
  });
});
