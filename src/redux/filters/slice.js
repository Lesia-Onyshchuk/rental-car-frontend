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
    //   setBrand: (state, action) => {
    //     state.brand = action.payload;
    //   },
    //   setPrice: (state, action) => {
    //     state.filters.price = action.payload;
    //   },
    //   setFromMileage: (state, action) => {
    //     state.filters.fromMileage = action.payload;
    //   },
    //   setToMileage: (state, action) => {
    //     state.filters.toMileage = action.payload;
    //   },
    // resetFilters: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        console.log("data", state.brands);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const { setFilters } = slice.actions;
export const filtersReducer = slice.reducer;
