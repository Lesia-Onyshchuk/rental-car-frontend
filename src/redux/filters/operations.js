import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await api.get("/brands");
      console.log("data", data);
      console.log(data);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
