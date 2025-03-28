import { BaseQueryFn } from '@reduxjs/toolkit/query';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { DEVBASEURL } from '../../config/Env';
import { clearCookies, getCookie, SESSION_COOKIE_NAME } from '../../utils/CookieUtils';
import { clearAsyncKeyData, storeItem, USER_DATA } from '../../utils/CustomAsyncStorage';
import { logoutUser } from '../thunks/authThunk';

// Base query setup
const baseQuery = fetchBaseQuery({
  baseUrl: DEVBASEURL,
  credentials: 'include',
});

// Custom base query with authentication handling
interface BaseQueryArgs {
  url: string;
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

const baseQueryWithAuth: BaseQueryFn<BaseQueryArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error as FetchBaseQueryError).status === 401 &&
    args.url !== '/check-authgetdata'
  ) {
    console.log('🔥 Unauthorized request detected, logging out user...');

    try {
      // 🔥 Clear session data
      await clearCookies();
      await clearAsyncKeyData(SESSION_COOKIE_NAME)
       await clearAsyncKeyData(USER_DATA);

      // 🔥 Dispatch logout action to update Redux state
      api.dispatch(logoutUser());

    } catch (error) {
      console.error('🔥 Error during auto-logout:', error);
    }
  }

  return result;
};

// API configuration
interface CheckSessionResponse {
  success: boolean;
  [key: string]: unknown; 
}

interface CheckSessionQueryArgs {}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Auth', 'User', 'Task', 'Project'],
  endpoints: (builder) => ({
    checkSession: builder.query<CheckSessionResponse, CheckSessionQueryArgs>({
      query: () => ({
        url: '/check-authgetdata',
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            console.log('✅ Session valid:', data);
            const sessionId = await getCookie();
            if (sessionId) {
              await storeItem(SESSION_COOKIE_NAME, sessionId);
            }
          }
        } catch (error) {
          console.error('🔥 Session check failed, logging out user:', error);

          // 🔥 Clear session data
          await clearCookies();
          await clearAsyncKeyData(SESSION_COOKIE_NAME);
          await clearAsyncKeyData(USER_DATA);

          // 🔥 Dispatch logout action
          dispatch(logoutUser());
        }
      },
    }),
  }),
});

export const { useCheckSessionQuery } = baseApi;