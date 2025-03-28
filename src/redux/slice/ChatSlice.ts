import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl } from '../../config/Env';

interface AsyncThunkConfig {
  state: CounterState;
  dispatch: any;
  extra: any;
  rejectValue: any;
}

export interface Member {
  user: User;
  isAdmin?: boolean;
  isRemoved?: boolean;
  isDelete?: boolean;
}
export interface User {
  _id: string;
  name: string;
  profile: string;
  lastSeen: string;
}
export interface CurrentChat {
  _id: string;
  members: Member[];
  discription?: string;
  isGroup: boolean;
  canEdit?: boolean;
  canAdd?: boolean;
  canMessage?: boolean;
  chatName?: string;
  profile?: string;
  timeLine: [
    {
      addedBy?: {_id: string; name: string};
      user: User;
      addDate?: Date;
      removedBy?: {_id: string; name: string};
      removeDate?: Date;
    },
  ];
  createdAt?: Date;
  createdBy: {_id: string; name: string};
  lastMessage?: string;
  lastDate?: string | Date;
  unRead?: number;
}
export interface CounterState {
  currentChat: CurrentChat | null;
  chats: CurrentChat[];
}

const initialState: CounterState = {
  currentChat: null,
  chats: [],
};

export const StartChats = createAsyncThunk<
  void,
  {
    members: string[];
    userId: string;
    isGroup: boolean;
    name?: string;
    canEdit?: boolean;
    canMessage?: boolean;
    canAdd?: boolean;
  },
  AsyncThunkConfig
>('StartChats', async body => {
  try {
    const response = await fetch(`${apiUrl}/app/createChat`, {
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});
export const UpdateGroup = createAsyncThunk<
  void,
  {chatId: string; name?: string; discription?: string},
  AsyncThunkConfig
>('UpdateGroup', async body => {
  try {
    const response = await fetch(`${apiUrl}/app/updateChat`, {
      method: 'PUT',
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});

export const GetChats = createAsyncThunk<
  void,
  {userId: string},
  AsyncThunkConfig
>('GetChats', async ({userId}) => {
  try {
    const response = await fetch(`${apiUrl}/app/getChats?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});

export const GetChat = createAsyncThunk<
  void,
  {chatId: string},
  AsyncThunkConfig
>('GetChat', async ({chatId}) => {
  try {
    const response = await fetch(`${apiUrl}/app/getChat/${chatId}`, {
      method: 'GEt',
      headers: {
        'Content-Type': 'application/json',
      },
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});
export const AddMembers = createAsyncThunk<
  void,
  {chatId: string; members: string[]; addedBy: string},
  AsyncThunkConfig
>('AddMembers', async body => {
  try {
    const response = await fetch(`${apiUrl}/app/addMembers`, {
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});
export const removeMembers = createAsyncThunk<
  void,
  {chatId: string; member: string; removeBy: string},
  AsyncThunkConfig
>('removeMembers', async body => {
  try {
    const response = await fetch(`${apiUrl}/app/removeMembers`, {
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});
export const makeAdmin = createAsyncThunk<
  void,
  {chatId: string; member: string},
  AsyncThunkConfig
>('makeAdmin', async body => {
  try {
    const response = await fetch(`${apiUrl}/app/makeAdmin`, {
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
      message: (error as {message: string}).message,
    };
    return a;
  }
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(StartChats.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          contact: any[];
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          //   state.contact = (typedPayload as { contact: any[] }).contact
        }
      })
      .addCase(GetChat.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          chat: CurrentChat;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.currentChat = (typedPayload as {chat: CurrentChat}).chat;
        }
      })
      .addCase(AddMembers.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          chat: CurrentChat;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.currentChat = (typedPayload as {chat: CurrentChat}).chat;
        }
      })
      .addCase(removeMembers.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          chat: CurrentChat;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.currentChat = (typedPayload as {chat: CurrentChat}).chat;
        }
      })
      .addCase(makeAdmin.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          chat: CurrentChat;
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.currentChat = (typedPayload as {chat: CurrentChat}).chat;
        }
      })
      .addCase(GetChats.fulfilled, (state, {payload}) => {
        interface LoginPayload {
          success: boolean;
          chats: CurrentChat[];
        }
        const typedPayload = payload as unknown as LoginPayload;
        if (typedPayload?.success) {
          state.chats = (typedPayload as {chats: CurrentChat[]}).chats;
        }
      });
  },
});

export default counterSlice.reducer;
