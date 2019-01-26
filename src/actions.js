// USER INTERACTIONS

export const START_FLOW = "START_FLOW";
export const SELECT_ITEM = "SELECT_ITEM";
export const SELECT_COLOR = "SELECT_COLOR";
export const CONFIRMATION = "CONFIRMATION";

export const startFlow = () => ({ type: START_FLOW });
export const selectItem = (item) => ({ type: SELECT_ITEM, payload: { item } });
export const selectColor = () => ({ type: SELECT_COLOR });
export const confirmation = () => ({ type: CONFIRMATION });

export const userInteractionTypes = {
  START_FLOW,
  SELECT_ITEM,
  SELECT_COLOR,
  CONFIRMATION
};

export const userInteractions = {
  startFlow,
  selectItem,
  selectColor,
  confirmation
};


// UI ACTIONS

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_SIDEBAR = "OPEN_SIDEBAR";
export const SIDEBAR_LOADING = "SIDEBAR_LOADING";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
export const SHOW_ITEMS = "SHOW_ITEMS";
export const RESET_STATE = "RESET_STATE";

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const sidebarLoading = (loading) => ({ type: SIDEBAR_LOADING, payload: { loading } });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
export const showItems = () => ({ type: SHOW_ITEMS });
export const resetState = () => ({ type: RESET_STATE });

export const uiActions = {
  openModal,
  closeModal,
  openSidebar,
  sidebarLoading,
  closeSidebar,
  showItems,
  resetState
};

export const uiActionTypes = {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SHOW_ITEMS,
  RESET_STATE
};

// DATA ACTIONS

export const STORE_JEANS = "STORE_JEANS";
export const STORE_SHIRTS = "STORE_SHIRTS";
export const ITEM_SELECTED = "ITEM_SELECTED";

export const storeJeans = (items) => ({ type: STORE_JEANS, payload: { items } });
export const storeShirts = (items) => ({ type: STORE_SHIRTS, payload: { items } });
export const itemSelected = (item) => ({ type: ITEM_SELECTED, payload: { item } });
