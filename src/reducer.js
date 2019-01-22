import { uiActionTypes, STORE_FLIGHTS, STORE_HOTELS, CATEGORY_SELECTED } from "./actions";

const initialState = {
  sidebar: { open: false, loading: false },
  modal: { open: false },
  categories: { show: false, selected: null },
  data: {
    flights: [],
    hotels: [],
  },
};

const update = (state, key, value) => ({ ...state, [key]: { ...state[key], ...value } });

export default function context(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case uiActionTypes.SHOW_CATEGORIES:
      return update(state, "categories", { show: true });
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
    case CATEGORY_SELECTED:
      return update(state, "categories", { selected: payload.category });
    case STORE_FLIGHTS:
      return update(state, "data", { flights: payload.items });
    case STORE_HOTELS:
      return update(state, "data", { hotels: payload.items });
    case uiActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
