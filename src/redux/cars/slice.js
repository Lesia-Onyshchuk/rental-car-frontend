import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = { items: [], loading: false, error: null };

const slice = createSlice({
  name: "cars",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const carsReducer = slice.reducer;
