import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";
import { filtersReducer } from "./filters/slice.js";
import { selectedReducer } from "./selected/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    selected: selectedReducer,
  },
});
