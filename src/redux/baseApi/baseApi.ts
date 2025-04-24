/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logout } from '@/lib/services/AuthService'; 

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => { 
    const token = localStorage.getItem('token'); 
    if (token) {
      headers.set('authorization', `${token}`);
    } 
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    //* Send Refresh
    console.log('Sending refresh token');

    const res = await fetch('http://localhost:5000/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await res.json();
    if (data?.data?.token) {
      api.dispatch({ type: 'auth/updateToken', payload: data.data.token });
      localStorage.setItem('token', data.data.token);
      console.log('Refresh token response:', data);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Users', 'Listings','Product',],
  endpoints: () => ({}),
});

//cc

 