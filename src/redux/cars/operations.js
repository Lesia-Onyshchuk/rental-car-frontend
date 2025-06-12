import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const { data } = await api.get(`/cars?page=${page}`);
      return data.cars;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
