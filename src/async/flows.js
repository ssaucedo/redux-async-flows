import * as actions from "../actions";
import { getAvailableColors } from '../utils';

const { userInteractionTypes: user, uiActions: ui } = actions;

export const userFlow = () => async (dispatch, getState, take) => {
  dispatch(ui.showItems());
  const { payload: { item } } =
      await take(user.SELECT_ITEM);
  dispatch(actions.itemSelected(item));
  dispatch(ui.sidebarLoading(true));
  dispatch(ui.openSidebar());
  const availableColors = await getAvailableColors(item);
  if(item === 'shirts') {
    dispatch(actions.storeShirts(availableColors));
  } else {
    dispatch(actions.storeJeans(availableColors));
  }
  dispatch(ui.sidebarLoading(false));
  await take(user.SELECT_COLOR);
  dispatch(ui.closeSidebar());
  dispatch(ui.openModal());
  await take(user.CONFIRMATION);
  dispatch(ui.closeModal());
  dispatch(ui.resetState());
};
