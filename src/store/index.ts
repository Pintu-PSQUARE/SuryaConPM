import {configureStore} from '@reduxjs/toolkit';
import UserSlice from '../reducers/UserSlice';
import ContactSlice from '../reducers/ContactSlice';

export const store = configureStore({
  reducer: {
    userStore: UserSlice,
    contactStore: ContactSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
