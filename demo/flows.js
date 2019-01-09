import bookingService from "./service";
import { userInteractions as user, displayFlightDetails, bookingSuccess, showPaymentMethods } from "./actions";

const testFlow = (take, getState, dispatch) =>
  async function basicFlow() {
    const { payload: flight } = await take(user.USER_SELECTS_FLIGHT);
    dispatch(displayFlightDetails(flight));

    const { type: paymentType } = await Promise.race([
      take(user.CREDIT_CARD_PAYMENT),
      take(user.OTHER_METHOD_PAYMENT)
    ]);
    
    if (paymentType === user.CREDIT_CARD_PAYMENT) {
      dispatch(showPaymentMethods({ method: "credit card" }))
    }

    if (paymentType === user.OTHER_METHOD_PAYMENT) {
      dispatch(showPaymentMethods({ method: "other methods" }))
    }

    const { res } = await bookingService(paymentType);
    dispatch(bookingSuccess());
  };

export default testFlow;
