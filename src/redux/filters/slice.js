import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./operations";

const initialState = {
  brands: [],
  filters: { brand: "", rentalPrice: "", minMileage: "", maxMileage: "" },
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { setFilters, resetFilters } = slice.actions;
export const filtersReducer = slice.reducer;
