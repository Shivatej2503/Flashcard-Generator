// flashcardSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  cards: [],
};

const flashcardSlice = createSlice({
  name: "flash",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    addCard(state, action) {
      const payload = action.payload;
      state.cards.push({
        id: nanoid(),
        title: payload.title,
        description: payload.description,
        image: payload.image || null,
        terms: payload.terms || [], // [{id, term, definition, image}]
        createdAt: Date.now(),
      });
    },
    updateCard(state, action) {
      const { id, card } = action.payload;
      state.cards = state.cards.map((c) => (c.id === id ? { ...c, ...card } : c));
    },
    removeCard(state, action) {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCard, updateCard, removeCard, setCards } = flashcardSlice.actions;
export default flashcardSlice.reducer;