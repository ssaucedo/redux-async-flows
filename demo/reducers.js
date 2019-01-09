import {
    DISPLAY_FLIGHT_DETAILS,
    SHOW_PAYMENT_METHODS,
    BOOKING_SUCCESS,
} from "./actions";

const initialState = {
    displayFlightDetails: false,
    showPaymentMerhod: false,
    paymentMethod: '',
    bookingSuccess: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case DISPLAY_FLIGHT_DETAILS:
      return {
        ...state,
        displayFlightDetails: true,
      };
    case SHOW_PAYMENT_METHODS:
      return {
        ...state,
        showPaymentMerhod: true,
        paymentMethod: payload.method
      };
    case BOOKING_SUCCESS:
      return {
        ...initialState,
        bookingSuccess: true,
      };
    default:
      return state;
  }
}

export default reducer;