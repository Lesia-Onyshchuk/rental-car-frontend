import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cars");
      return data.cars;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
