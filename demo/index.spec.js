import { createStore, applyMiddleware } from "redux";
import testFlow from "./flows";
import reducer from "./reducers";
import {
  userInteractions as user,
  selectFlight,
  creditCardPayment,
  otherMethodsPayment,
  displayFlightDetails,
  bookingSuccess,
  showPaymentMethods
} from "./actions";

import createAsyncForFlowsMiddleware from "../src/index";
import { step } from "../src/test-utils";

describe("enhanced store", () => {
  let dispatch = null;
  let getState = null;
  let takeStep = null;
  let spiedTake = null;
  let spiedDispatch = null;

  beforeEach(() => {
    const {
      take: takeFn,
      middleware: asyncMiddleware
    } = createAsyncForFlowsMiddleware();

    const store = createStore(reducer, applyMiddleware(asyncMiddleware));

    dispatch = store.dispatch;
    getState = store.getState;
    takeStep = step(takeFn, dispatch);
    spiedTake = jest.fn(takeFn);
    spiedDispatch = jest.fn(dispatch);
  });

  describe("payment cases", () => {
    it("should support credit card", async () => {
      const flowPromise = testFlow(spiedTake, getState, spiedDispatch)();

      await takeStep(user.USER_SELECTS_FLIGHT, selectFlight, { payload: { flight: {} }});

      expect(spiedTake.mock.calls[0][0]).toEqual(user.USER_SELECTS_FLIGHT);

      expect(spiedDispatch.mock.calls[0][0]).toEqual(displayFlightDetails({ payload: { flight: {} }}));

      expect(spiedTake.mock.calls[1][0]).toEqual(user.CREDIT_CARD_PAYMENT);

      expect(spiedTake.mock.calls[2][0]).toEqual(user.OTHER_METHOD_PAYMENT);

      await takeStep(user.CREDIT_CARD_PAYMENT, creditCardPayment);

      await flowPromise;

      expect(spiedDispatch.mock.calls[1][0]).toEqual(showPaymentMethods({ method: "credit card" }));

      expect(spiedDispatch.mock.calls[2][0]).toEqual(bookingSuccess());
    });

    it("should support other methods", async () => {
      const flowPromise = testFlow(spiedTake, getState, spiedDispatch)();

      await takeStep(user.USER_SELECTS_FLIGHT, selectFlight, { payload: { flight: {} }});

      expect(spiedTake.mock.calls[0][0]).toEqual(user.USER_SELECTS_FLIGHT);

      expect(spiedDispatch.mock.calls[0][0]).toEqual(displayFlightDetails({ payload: { flight: {} }}));

      expect(spiedTake.mock.calls[1][0]).toEqual(user.CREDIT_CARD_PAYMENT);

      expect(spiedTake.mock.calls[2][0]).toEqual(user.OTHER_METHOD_PAYMENT);

      await takeStep(user.OTHER_METHOD_PAYMENT, otherMethodsPayment);

      await flowPromise;

      expect(spiedDispatch.mock.calls[1][0]).toEqual(showPaymentMethods({ method: "other methods" }));

      expect(spiedDispatch.mock.calls[2][0]).toEqual(bookingSuccess());
    });
  });
});
