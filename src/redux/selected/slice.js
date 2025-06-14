import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("selectedCars");
const initialState = {
  selected: saved ? JSON.parse(saved) : [],
};

const slice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected(state, action) {
      const car = action.payload;
      const exists = state.selected.find((item) => item.id === car.id);
      if (!exists) {
        const updated = [...state.selected, car];
        state.selected = updated;
        localStorage.setItem("selectedCars", JSON.stringify(updated));
      }
    },
    removeSelected(state, action) {
      const carId = action.payload;
      const updated = state.selected.filter((item) => item.id !== carId);
      state.selected = updated;
      localStorage.setItem("selectedCars", JSON.stringify(updated));
    },
  },
});

export const { setSelected, removeSelected } = slice.actions;
export const selectedReducer = slice.reducer;
