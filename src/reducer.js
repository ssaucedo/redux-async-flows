import { uiActionTypes, STORE_JEANS, STORE_SHIRTS, ITEM_SELECTED } from "./actions";

const initialState = {
  sidebar: { open: false, loading: false },
  modal: { open: false },
  items: { show: false, selected: null },
  data: {
    shirts: [],
    jeans: [],
  },
};

const update = (state, key, value) => ({ ...state, [key]: { ...state[key], ...value } });

export default function context(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case uiActionTypes.SHOW_ITEMS:
      return update(state, "items", { show: true });
    case uiActionTypes.OPEN_MODAL:
      return update(state, "modal", { open: true });
    case uiActionTypes.CLOSE_MODAL:
      return update(state, "modal", { open: false });
    case uiActionTypes.OPEN_SIDEBAR:
      return update(state, "sidebar", { open: true });
      case uiActionTypes.CLOSE_SIDEBAR:
      return update(state, "sidebar", { open: false });
    case uiActionTypes.SIDEBAR_LOADING:
      return update(state, "sidebar", { loading: payload.loading });
    case ITEM_SELECTED:
      return update(state, "items", { selected: payload.item });
    case STORE_JEANS:
      return update(state, "data", { jeans: payload.items });
    case STORE_SHIRTS:
      return update(state, "data", { shirts: payload.items });
    case uiActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
