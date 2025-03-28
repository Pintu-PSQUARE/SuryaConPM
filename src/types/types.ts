import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

export type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  _id: string; 
  name: string;
  email: string;
  profile?: string;
  role?: string;
  department?: {
    _id: string;
    name: string;
  };
  designation?: {
    _id: string;
    name: string;
  };
  phoneNumber?: string;
}