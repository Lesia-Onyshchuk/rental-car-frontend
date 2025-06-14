import { createSlice } from "@reduxjs/toolkit";
import { fetchCarById, fetchCars } from "./operations";

const initialState = {
  items: [],
  car: null,
  loading: false,
  error: null,
  totalCars: 0,
  page: 1,
  totalPages: 0,
};

const slice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearCars(state) {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;

        state.page = Number(action.payload.page);
        state.items =
          state.page > 1
            ? [...state.items, ...action.payload.cars]
            : action.payload.cars;
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
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

export const { clearCars } = slice.actions;
export const carsReducer = slice.reducer;
