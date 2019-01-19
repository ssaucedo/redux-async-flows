// UI UPDATES
export const DISPLAY_FLIGHT_DETAILS = "DISPLAY_FLIGHT_DETAILS";
export const SHOW_PAYMENT_METHODS = "SHOW_PAYMENT_METHODS";
export const BOOKING_SUCCESS = "BOOKING_SUCCESS";

export const uiUpdates = {
  DISPLAY_FLIGHT_DETAILS,
  SHOW_PAYMENT_METHODS,
  BOOKING_SUCCESS,
};

export const displayFlightDetails = payload => ({
  type: uiUpdates.DISPLAY_FLIGHT_DETAILS,
  payload
});

export const showPaymentMethods = payload => ({
  type: uiUpdates.SHOW_PAYMENT_METHODS,
  payload
});

export const bookingSuccess = payload => ({
  type: uiUpdates.BOOKING_SUCCESS,
  payload
});

// USER INTERACTIONS

export const USER_SELECTS_FLIGHT = "USER_SELECTS_FLIGHT";
export const CREDIT_CARD_PAYMENT = "CREDIT_CARD_PAYMENT";
export const OTHER_METHOD_PAYMENT = "OTHER_METHOD_PAYMENT";
export const BOOKING_CANCELLATION = "BOOKING_CANCELLATION";
export const CAPTCHA_CONFIRMATION = "CAPTCHA_CONFIRMATION";
export const SMS_CONFIRMATION = "SMS_CONFIRMATION";

export const userInteractions = {
  USER_SELECTS_FLIGHT,
  CREDIT_CARD_PAYMENT,
  OTHER_METHOD_PAYMENT,
  BOOKING_CANCELLATION,
  CAPTCHA_CONFIRMATION,
  SMS_CONFIRMATION
};

export const selectFlight = payload => ({
  type: userInteractions.USER_SELECTS_FLIGHT,
  payload
});

export const creditCardPayment = () => ({
  type: userInteractions.CREDIT_CARD_PAYMENT,
});

export const otherMethodsPayment = () => ({
  type: userInteractions.OTHER_METHOD_PAYMENT,
});

export const cancelBooking = () => ({
  type: userInteractions.BOOKING_CANCELLATION,
});

export const captchaConfirmation = () => ({
  type: userInteractions.CAPTCHA_CONFIRMATION,
});

export const smsConfirmation = () => ({
  type: userInteractions.SMS_CONFIRMATION,
});
