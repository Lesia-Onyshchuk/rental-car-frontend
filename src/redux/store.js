import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";
import { filtersReducer } from "./filters/slice.js";
import { selectedReducer } from "./selected/slice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const filtersPersistConfig = {
  key: "filters",
  storage,
};

const selectedPersistConfig = {
  key: "selected",
  storage,
};

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: persistReducer(filtersPersistConfig, filtersReducer), // зберігається
    selected: persistReducer(selectedPersistConfig, selectedReducer), // зберігається
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
