import * as actions from "./actions";

const { uiActions: ui } = actions;

export const userStartsFlow = () => (dispatch, getState) => {
    dispatch(ui.showCategories());
};

export const categorySelected = () => (dispatch, getState) => {
    dispatch(ui.openSidebar());
};

export const optionSelected = () => (dispatch, getState) => {
    dispatch(ui.closeSidebar());
    dispatch(ui.openModal());
};

export const operationConfirmation = () => (dispatch, getState) => {
    dispatch(ui.closeModal());
    dispatch(ui.resetState());
};
