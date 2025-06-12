import { createSlice } from "@reduxjs/toolkit";
import { fetchCarById, fetchCars } from "./operations";

const initialState = {
  items: [],
  car: null,
  loading: false,
  error: null,
  totalCars: "",
  page: "",
  totalPages: "",
};

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
      })
      .addCase(fetchCarById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.car = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const carsReducer = slice.reducer;
