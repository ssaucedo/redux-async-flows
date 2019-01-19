import { uiActionTypes } from "./actions";

const initialState = {
  sidebar: { open: false },
  modal: { open: false },
  categories: { show: false }
};

const update = (state, key, value) => ({ ...state, [key]: value });

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
    case uiActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
