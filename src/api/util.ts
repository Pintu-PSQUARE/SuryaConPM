import { createApi, fetchBaseQuery, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import Cookies from '@react-native-cookies/cookies';
import { TESTINGUR } from '../config/Env';

export const getCookiesString = async (): Promise<string> => {
  try {
    const cookies = await Cookies.get(TESTINGUR);
    return Object.entries(cookies)
      .map(([key, value]) => `${key}=${value.value}`)
      .join('; ');
  } catch (error) {
    console.error('Error fetching cookies:', error);
    return '';
  }
};

// Custom async baseQuery function
const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  const cookieString = await getCookiesString();

  const baseQuery = fetchBaseQuery({
    baseUrl: TESTINGUR,
    prepareHeaders: (headers) => {
      if (cookieString) {
        headers.set('Cookie', cookieString);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
    credentials: 'include',
  });

  return baseQuery(args, api, extraOptions); 
};

// Create API with modified baseQuery
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth, 
  endpoints: () => ({}),
});