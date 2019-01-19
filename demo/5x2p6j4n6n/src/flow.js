import * as actions from "./actions";

const { userInteractionTypes: user, uiActions: ui } = actions;

export const userFlow = () => async (dispatch, getState, take) => {
  dispatch(ui.showCategories());
  await take(user.SELECT_CATEGORY);
  dispatch(ui.openSidebar());
  await take(user.SELECT_OPTION);
  dispatch(ui.closeSidebar());
  dispatch(ui.openModal());
  await take(user.CONFIRMATION);
  dispatch(ui.closeModal());
  dispatch(ui.resetState());
};
