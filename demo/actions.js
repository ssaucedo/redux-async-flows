// UI UPDATES
export const DISPLAY_FLIGHT_DETAILS = "DISPLAY_FLIGHT_DETAILS";
export const SHOW_PAYMENT_METHODS = "SHOW_PAYMENT_METHODS";
export const BOOKING_SUCCESS = "BOOKING_SUCCESS";

export const uiUpdates = {
  DISPLAY_FLIGHT_DETAILS,
  SHOW_PAYMENT_METHODS,
  BOOKING_SUCCESS,
};

// USER INTERACTIONS

export const USER_SELECTS_FLIGHT = "USER_SELECTS_FLIGHT";
export const CREDIT_CARD_PAYMENT = "CREDIT_CARD_PAYMENT";
export const OTHER_METHOD_PAYMENT = "OTHER_METHOD_PAYMENT";
export const BOOKING_CANCELLATION = "BOOKING_CANCELLATION";

export const userInteractions = {
  USER_SELECTS_FLIGHT,
  CREDIT_CARD_PAYMENT,
  OTHER_METHOD_PAYMENT,
  BOOKING_CANCELLATION,
};

export const selectFlight = payload => ({
  type: USER_SELECTS_FLIGHT,
  payload
});

export const creditCardPayment = () => ({
  type: CREDIT_CARD_PAYMENT,
});

export const otherMethodsPayment = () => ({
  type: OTHER_METHOD_PAYMENT,
});

export const cancelBooking = () => ({
  type: BOOKING_CANCELLATION,
});
