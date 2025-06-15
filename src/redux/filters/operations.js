import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/brands");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
