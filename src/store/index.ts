import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../reducers/UserSlice';
import ContactSlice from '../reducers/ContactSlice';
import { baseApi } from '../api/util'; 

export const store = configureStore({
  reducer: {
    userStore: UserSlice,
    contactStore: ContactSlice,
    [baseApi.reducerPath]: baseApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;