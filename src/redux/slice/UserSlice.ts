import {createSlice} from '@reduxjs/toolkit';
import {AuthState} from '../../types/types';
import {
  checkSession,
  loginById,
  loginWithNumber,
  loginOtpVerify,
  logoutUser,
  restoreSession,
} from '../thunks/authThunk';
import {
  storeItem,
  clearAsyncKeyData,
  USER_DATA,
} from '../../utils/CustomAsyncStorage';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(restoreSession.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        if (payload) {
          state.isAuthenticated = true;
          state.user = payload;
        }
      })
      .addCase(restoreSession.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(checkSession.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        if (payload) {
          state.isAuthenticated = true;
          state.user = payload;
          storeItem(USER_DATA, payload);
        }
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(loginById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginById.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        if (payload) {
          state.isAuthenticated = true;
          state.user = payload;
          storeItem(USER_DATA, payload);
        }
      })
      .addCase(loginById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginWithNumber.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithNumber.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(loginWithNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginOtpVerify.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginOtpVerify.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        if (payload) {
          state.isAuthenticated = true;
          state.user = payload;
          storeItem(USER_DATA, payload);
        }
      })
      .addCase(loginOtpVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        clearAsyncKeyData(USER_DATA);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
