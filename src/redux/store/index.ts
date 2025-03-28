import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slice/UserSlice";
import ContactSlice from "../slice/ContactSlice";
import ProjectSlice from "../slice/ProjectSlice";
import ChatSlice from "../slice/ChatSlice";
import { baseApi } from "../store/util"; 

export const store = configureStore({
  reducer: {
    userStore: UserSlice,
    contactStore: ContactSlice,
    projectStore: ProjectSlice,
    chatStore: ChatSlice,
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