import * as actions from "./actions";
import { categoriesService } from './utils';

const { uiActions: ui } = actions;

export const userStartsFlow = () => (dispatch, getState) => {
    dispatch(ui.showCategories());
};

export const categorySelected = () =>
    async (dispatch, getState) => {
        const { selected } = getState().categories;
        dispatch(ui.sidebarLoading(true));
        dispatch(ui.openSidebar());
        const items = await categoriesService(selected);
        if (selected === 'flights') {
            dispatch(actions.storeFlights(items));
        } else {
            dispatch(actions.storeHotels(items));
        }
        dispatch(ui.sidebarLoading(false));
    };

export const optionSelected = () => (dispatch, getState) => {
    dispatch(ui.closeSidebar());
    dispatch(ui.openModal());
};

export const operationConfirmation = () => (dispatch, getState) => {
    dispatch(ui.closeModal());
    dispatch(ui.resetState());
};
