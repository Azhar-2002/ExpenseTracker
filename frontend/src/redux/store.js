import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { PersistGate } from 'redux-persist/integration/react' 
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer= combineReducers({
    auth: authSlice,
    expense: expenseSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    // reducer: {
    //     auth: authSlice,
    //     expense: expenseSlice
    // }
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export default store;