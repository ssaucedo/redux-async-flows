import bookingService from "./service";
import { userInteractions as user, displayFlightDetails, bookingSuccess, showPaymentMethods } from "./actions";

const testFlow = (dispatch, getState, take) =>
  async function basicFlow() {
    const { payload: flight } = await take(user.USER_SELECTS_FLIGHT);
    dispatch(displayFlightDetails(flight));

    const { type: paymentType } = await take.any(
      user.CREDIT_CARD_PAYMENT, user.OTHER_METHOD_PAYMENT
    );
    
    if (paymentType === user.CREDIT_CARD_PAYMENT) {
      dispatch(showPaymentMethods({ method: "credit card" }))
    }

    if (paymentType === user.OTHER_METHOD_PAYMENT) {
      dispatch(showPaymentMethods({ method: "other methods" }))
    }

    await take.all(user.CAPTCHA_CONFIRMATION, user.SMS_CONFIRMATION);

    await bookingService(paymentType);
    dispatch(bookingSuccess());
  };

export default testFlow;
