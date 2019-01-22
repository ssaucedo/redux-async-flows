import * as actions from "./actions";
import { categoriesService } from './utils';

const { userInteractionTypes: user, uiActions: ui } = actions;

export const userFlow = () => async (dispatch, getState, take) => {
  dispatch(ui.showCategories());
  const { payload: { selected } } =
      await take(user.SELECT_CATEGORY);
  dispatch(actions.categorySelected(selected));
  dispatch(ui.sidebarLoading(true));
  dispatch(ui.openSidebar());
  const items = await categoriesService(selected);
  if(selected === 'flights') {
    dispatch(actions.storeFlights(items));
  } else {
    dispatch(actions.storeHotels(items));
  }
  dispatch(ui.sidebarLoading(false));
  await take(user.SELECT_OPTION);
  dispatch(ui.closeSidebar());
  dispatch(ui.openModal());
  await take(user.CONFIRMATION);
  dispatch(ui.closeModal());
  dispatch(ui.resetState());
};
