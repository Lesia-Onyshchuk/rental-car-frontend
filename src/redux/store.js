import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    // filters: filtersReducer,
    // selected: selectedReducer,
  },
});
