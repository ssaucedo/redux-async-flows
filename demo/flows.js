import bookingService from "./service";
import { userInteractions as user, uiUpdates as ui } from "./actions";

const testFlow = (take, getState, dispatch) =>
  async function basicFlow() {
    // dispatch, getState)
    const { payload: flight } = await take(user.USER_SELECTS_FLIGHT);
    dispatch({ type: ui.DISPLAY_FLIGHT_DETAILS });

    const { type: paymentType } = await Promise.race([
      take(user.CREDIT_CARD_PAYMENT),
      take(user.OTHER_METHOD_PAYMENT)
    ]);
    
    if (paymentType === user.CREDIT_CARD_PAYMENT) {
      dispatch({
        type: ui.SHOW_PAYMENT_METHODS,
        payload: { method: "credit card" }
      });
    }

    if (paymentType === user.OTHER_METHOD_PAYMENT) {
      dispatch({
        type: ui.SHOW_PAYMENT_METHODS,
        payload: { method: "other methods" }
      });
    }

    const { res } = await bookingService(paymentType);
    dispatch({ type: ui.BOOKING_SUCCESS });
  };

export default testFlow;
