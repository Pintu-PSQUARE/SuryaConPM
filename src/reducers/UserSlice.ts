import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { apiUrl } from '../config/Env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from '@react-native-cookies/cookies';
import { getCookiesString } from '../api/util';

export interface AuthState {
  isLogin: boolean;
  user: User | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profile?: string;
  role?: string;
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
};

// Utility function to get session cookies
const getSessionCookies = async () => {
  try {
    const cookies = await Cookies.get(apiUrl);
    console.log('Session Cookies:', cookies);
    return cookies;
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return null;
  }
};

export const LoginById = createAsyncThunk<void, { employeeId: string; password: string }, AsyncThunkConfig>(
  'LoginById',
  async (requestData) => {
    try {
      const response = await fetch(`${apiUrl}/hrmaster/employee/loginEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are included
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);
      }

      // Fetch session cookies
      const sessionCookies = await getSessionCookies();
      if (sessionCookies) {
        await AsyncStorage.setItem('sessionCookies', JSON.stringify(sessionCookies));
      } else {
        console.warn('Session cookies not found.');
      }

      return data;
    } catch (error) {
      console.error('Login Error:', error);
      return {
        success: false,
        message: (error as { message: string }).message,
      };
    }
  }
);
export const TokenLogin = createAsyncThunk<void, void, AsyncThunkConfig>(
  'TokenLogin',
  async () => {
    try {
      const storedCookies = await AsyncStorage.getItem('sessionCookies');
      if (!storedCookies) {
        throw new Error('No session cookies found');
      }

      const cookies = JSON.parse(storedCookies);

      const response = await fetch(`${apiUrl}/app/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookies['connect.sid'], // Use stored session cookie
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);
      }

      return data;
    } catch (error) {
      console.error('Auto-login Error:', error);
      return {
        success: false,
        message: (error as { message: string }).message,
      };
    }
  }
);
export const LoginOtpVerify = createAsyncThunk<void, { credential: string, otp: string }, AsyncThunkConfig>(
  'LoginOtpVerify',
  async (body) => {
    try {
      const response = await fetch(`${apiUrl}/app/loginOtpVerify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);

      }
      return data;
    } catch (error) {
      const a = {
        success: false,
        message: (error as { message: string }).message
      }
      return a;
    }
  }
);
export const LoginWithNumber = createAsyncThunk<void, { id: string }, AsyncThunkConfig>(
  'LoginWithNumber',
  async (body) => {
    try {
      const response = await fetch(`${apiUrl}/app/loginWithOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);

      }
      return data;
    } catch (error) {
      const a = {
        success: false,
        message: (error as { message: string }).message
      }
      return a;
    }
  }
);
export const ForgotPasswordOtp = createAsyncThunk<void, { credential: string }, AsyncThunkConfig>(
  'ForgotPasswordOtp',
  async (body) => {
    try {
      const response = await fetch(`${apiUrl}/app/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);

      }
      return data;
    } catch (error) {
      const a = {
        success: false,
        message: (error as { message: string }).message
      }
      return a;
    }
  }
);
export const ForgotOtpVerification = createAsyncThunk<void, { credential: string, otp: string }, AsyncThunkConfig>(
  'ForgotOtpVerification',
  async (body) => {
    try {
      const response = await fetch(`${apiUrl}/app/forgotPasswordVerify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);

      }
      return data;
    } catch (error) {
      const a = {
        success: false,
        message: (error as { message: string }).message
      }
      return a;
    }
  }
);
export const ResetPassword = createAsyncThunk<void, { token: string, newPassword: string }, AsyncThunkConfig>(
  'ResetPassword',
  async (body) => {
    try {
      const response = await fetch(`${apiUrl}/app/resetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(`${data.message}`);

      }
      return data;
    } catch (error) {
      const a = {
        success: false,
        message: (error as { message: string }).message
      }
      return a;
    }
  }
);
export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      AsyncStorage.removeItem('sessionCookies'); 
    },
    login: (state, { payload }) => {
      state.user = { ...(payload as { management: User }).management, role: 'user' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginById.fulfilled, (state, { payload }) => {
        interface LoginPayload {
          success: boolean;
          management: User;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.isLogin = true;
          state.user = { ...(typedPayload as { management: User }).management, role: 'user' };
        }
      })
      .addCase(TokenLogin.fulfilled, (state, { payload }) => {
        interface LoginPayload {
          success: boolean;
          management: User;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.isLogin = true;
          state.user = { ...(typedPayload as { management: User }).management, role: 'user' };
        }
      });
  },
});
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e)
  }
};
export const getData = async (key: string, type: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (type === "string") {
      return value
    }
    else if (type === "object" && value !== null) {
      return JSON.parse(value)
    }
    return value
  } catch (e) {
    console.error(e)
  }
};
export const { logout, login } = counterSlice.actions
export default counterSlice.reducer