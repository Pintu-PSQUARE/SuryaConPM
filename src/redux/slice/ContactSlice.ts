import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl } from '../../config/Env'
export interface CounterState {
  contact: any[];
}
interface AsyncThunkConfig {
  state: CounterState;
  dispatch: any;
  extra: any;
  rejectValue: any;
}
const initialState: CounterState = {
    contact: [],
}

export const GetContact = createAsyncThunk<void,  AsyncThunkConfig>(
  'GetContact',
  async () => {
    try {
      const response = await fetch(`${apiUrl}/app/contact`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
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
  name: 'counter',
  initialState,
  reducers: {
   
  },
  extraReducers(builder) {
    builder
      .addCase(GetContact.fulfilled, (state, { payload }) => {
        interface LoginPayload {
          success: boolean;
          contact:any[] ;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.contact = (typedPayload as { contact: any[] }).contact
        }
      })
  },
})

export default counterSlice.reducer