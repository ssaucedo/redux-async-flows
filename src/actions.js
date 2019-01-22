// USER INTERACTIONS

export const START_FLOW = "START_FLOW";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const SELECT_OPTION = "SELECT_OPTION";
export const CONFIRMATION = "CONFIRMATION";

export const startFlow = () => ({ type: START_FLOW });
export const selectCategory = () => ({ type: SELECT_CATEGORY });
export const selectOption = () => ({ type: SELECT_OPTION });
export const confirmation = () => ({ type: CONFIRMATION });

export const userInteractionTypes = {
  START_FLOW,
  SELECT_CATEGORY,
  SELECT_OPTION,
  CONFIRMATION
};

export const userInteractions = {
  startFlow,
  selectCategory,
  selectOption,
  confirmation
};


// UI ACTIONS

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_SIDEBAR = "OPEN_SIDEBAR";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
export const SHOW_CATEGORIES = "SHOW_CATEGORIES";
export const RESET_STATE = "RESET_STATE";

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
export const showCategories = () => ({ type: SHOW_CATEGORIES });
export const resetState = () => ({ type: RESET_STATE });

export const uiActions = {
  openModal,
  closeModal,
  openSidebar,
  closeSidebar,
  showCategories,
  resetState
};

export const uiActionTypes = {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SHOW_CATEGORIES,
  RESET_STATE
};