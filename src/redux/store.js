import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./flashcardSlice";

const LOCAL_KEY = "flashcards_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return undefined;
    return { flash: { cards: JSON.parse(raw) } };
  } catch (e) {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    flash: flashcardReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state.flash.cards));
  } catch (e) {
    // ignore
  }
});
