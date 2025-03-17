// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
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
import authReducer from "./authSlice";

// 1) Combine your reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// 2) Create persist config for localStorage
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "resume"], // only persist these slices
};

// 3) Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4) Configure the store using the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5) Create and export the persistor
export const persistor = persistStore(store);

// 6) Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 7) Export the store as default
export default store;
