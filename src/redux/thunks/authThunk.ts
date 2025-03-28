import {createAsyncThunk} from '@reduxjs/toolkit';
import {DEVBASEURL} from '../../config/Env';
import {AsyncThunkConfig, User} from '../../types/types';
import {
  clearAsyncKeyData,
  retrieveItem,
  storeItem,
  USER_DATA,
} from '../../utils/CustomAsyncStorage';
import {
  clearCookies,
  getCookie,
  SESSION_COOKIE_NAME,
} from '../../utils/CookieUtils';

export const checkSession = createAsyncThunk<
  User | null,
  void,
  AsyncThunkConfig
>('auth/checkSession', async (_, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/check-authgetdata`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue('Session expired or invalid');
    }

    const data = await response.json();
    return data.success ? data.data.data : rejectWithValue(data.message);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginById = createAsyncThunk<
  User,
  {employeeId: string; password: string},
  AsyncThunkConfig
>('auth/loginById', async (requestData, {rejectWithValue}) => {
  try {
    const response = await fetch(
      `${DEVBASEURL}/hrmaster/employee/loginEmployee`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestData),
        credentials: 'include',
      },
    );

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    if (!responseData.success) {
      return rejectWithValue(responseData.message);
    }

    // Extracting user data from API response
    const userData: User = {
      _id: responseData.data.data.employeeId,
      name: responseData.data.data.name,
      email: responseData.data.data.email,
      phoneNumber: responseData.data.data.phoneNumber,
      department: responseData.data.data.departmentId,
      designation: responseData.data.data.designationId,
    };

    // Save session ID from cookie to AsyncStorage as backup
    const sessionId = await getCookie();
    if (sessionId) {
      await storeItem(SESSION_COOKIE_NAME, sessionId);
    }

    return userData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginWithNumber = createAsyncThunk<
  {credential: string},
  {id: string},
  AsyncThunkConfig
>('auth/initiatePhoneLogin', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/app/loginWithOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    
    if (!responseData.success) {
      return rejectWithValue(responseData.message);
    }

    // Return credential for subsequent OTP verification
    return { credential: body.id };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginOtpVerify = createAsyncThunk<
  User,
  {credential: string; otp: string},
  AsyncThunkConfig
>('auth/verifyPhoneLoginOtp', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/app/loginOtpVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    
    if (!responseData.success) {
      return rejectWithValue(responseData.message);
    }

    // Extract user data from API response
    const userData: User = {
      _id: responseData.data.data.employeeId,
      name: responseData.data.data.name,
      email: responseData.data.data.email,
      phoneNumber: responseData.data.data.phoneNumber,
      department: responseData.data.data.departmentId,
      designation: responseData.data.data.designationId,
    };

    // Save session ID from cookie to AsyncStorage as backup
    const sessionId = await getCookie();
    if (sessionId) {
      await storeItem(SESSION_COOKIE_NAME, sessionId);
    }

    return userData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const forgotPasswordOtp = createAsyncThunk<
  void,
  {credential: string},
  AsyncThunkConfig
>('auth/forgotPasswordOtp', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/app/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const forgotOtpVerification = createAsyncThunk<
  void,
  {credential: string; otp: string},
  AsyncThunkConfig
>('auth/forgotOtpVerification', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/app/forgotPasswordVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const resetPassword = createAsyncThunk<
  void,
  {token: string; newPassword: string},
  AsyncThunkConfig
>('auth/resetPassword', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${DEVBASEURL}/app/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logoutUser = createAsyncThunk<void, void, AsyncThunkConfig>(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await clearCookies();
      await clearAsyncKeyData(USER_DATA);

      const response = await fetch(`${DEVBASEURL}/app/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return rejectWithValue(`HTTP error! Status: ${response.status}`);
      }

      return;
    } catch (error) {
      await clearCookies();
      await clearAsyncKeyData(USER_DATA);
      return rejectWithValue((error as Error).message);
    }
  },
);

export const restoreSession = createAsyncThunk<
  User | null,
  void,
  AsyncThunkConfig
>('auth/restoreSession', async (_, {dispatch, rejectWithValue}) => {
  try {
    const storedUser = await retrieveItem(USER_DATA);
    const sessionId = await getCookie();

    if (!sessionId && !storedUser) {
      return rejectWithValue('No session found');
    }

    try {
      const sessionData = await dispatch(checkSession()).unwrap();
      return storedUser || sessionData;
    } catch (error) {
      await clearCookies();
      await clearAsyncKeyData(USER_DATA);
      return rejectWithValue('Session invalid, data cleared');
    }
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
