import { createStore, applyMiddleware } from "redux";
import testFlow from ".";
import {
  userInteractions as user,
  selectFlight,
  creditCardPayment,
  otherMethodsPayment,
  displayFlightDetails,
  captchaConfirmation,
  smsConfirmation,
  bookingSuccess,
  showPaymentMethods
} from "./actions";

import createAsyncFlowsMiddleware from "../lib/index";
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
      asyncFlowsMiddleware, 
    } = createAsyncFlowsMiddleware();

    const dummyReducer =  () => {};

    const store = createStore(dummyReducer, {}, applyMiddleware(asyncFlowsMiddleware));

    dispatch = store.dispatch;
    getState = store.getState;
    takeStep = step(takeFn, dispatch);
    spiedTake = jest.fn(takeFn);
    spiedTake.any = jest.fn(takeFn.any)
    spiedTake.all = jest.fn(takeFn.all)
    spiedDispatch = jest.fn(dispatch);
  });

  describe("payment cases", () => {
    it("should support credit card", async () => {
      const flowPromise = testFlow(spiedDispatch, getState, spiedTake)();

      await takeStep(user.USER_SELECTS_FLIGHT, selectFlight, { payload: { flight: {} }});

      expect(spiedTake.mock.calls[0][0]).toEqual(user.USER_SELECTS_FLIGHT);

      expect(spiedDispatch.mock.calls[0][0]).toEqual(displayFlightDetails({ payload: { flight: {} }}));

      expect(spiedTake.any.mock.calls[0]).toEqual([user.CREDIT_CARD_PAYMENT, user.OTHER_METHOD_PAYMENT]);

      await takeStep(user.CREDIT_CARD_PAYMENT, creditCardPayment);

      expect(spiedTake.all.mock.calls[0]).toEqual([user.CAPTCHA_CONFIRMATION, user.SMS_CONFIRMATION]);      

      await takeStep(user.CAPTCHA_CONFIRMATION, captchaConfirmation);
      await takeStep(user.SMS_CONFIRMATION, smsConfirmation)

      await flowPromise;

      expect(spiedDispatch.mock.calls[1][0]).toEqual(showPaymentMethods({ method: "credit card" }));

      expect(spiedDispatch.mock.calls[2][0]).toEqual(bookingSuccess());
    });

    it("should support other methods", async () => {
      const flowPromise = testFlow(spiedDispatch, getState, spiedTake)();

      await takeStep(user.USER_SELECTS_FLIGHT, selectFlight, { payload: { flight: {} }});

      expect(spiedTake.mock.calls[0][0]).toEqual(user.USER_SELECTS_FLIGHT);

      expect(spiedDispatch.mock.calls[0][0]).toEqual(displayFlightDetails({ payload: { flight: {} }}));

      expect(spiedTake.any.mock.calls[0]).toEqual([user.CREDIT_CARD_PAYMENT, user.OTHER_METHOD_PAYMENT]);

      await takeStep(user.OTHER_METHOD_PAYMENT, otherMethodsPayment);

      expect(spiedTake.all.mock.calls[0]).toEqual([user.CAPTCHA_CONFIRMATION, user.SMS_CONFIRMATION]);      

      await takeStep(user.CAPTCHA_CONFIRMATION, captchaConfirmation);
      await takeStep(user.SMS_CONFIRMATION, smsConfirmation)

      await flowPromise;

      expect(spiedDispatch.mock.calls[1][0]).toEqual(showPaymentMethods({ method: "other methods" }));

      expect(spiedDispatch.mock.calls[2][0]).toEqual(bookingSuccess());
    });
  });
});
