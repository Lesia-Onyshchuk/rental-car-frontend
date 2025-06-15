import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api.js";
import { setLoading } from "./slice.js";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const params = { page, ...filters };
      const { data } = await api.get("/cars", { params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
