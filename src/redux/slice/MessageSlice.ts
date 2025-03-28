/* eslint-disable @typescript-eslint/no-explicit-any */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiUrl} from '../../config/Env';
import {MessageObj} from '../../sql';
import {MessageStatus} from '../../socket';

interface AsyncThunkConfig {
  state: CounterState;
  dispatch: any;
  extra: any;
  rejectValue: any;
}
const Message = new MessageObj();

export interface Messages {
  chatId: string;
  reply?: string;
  sender: string;
  date: string | Date;
  message: string;
  id: string;
  isRead?: boolean;
  read_count: number;
  receive_count: number;
  user?: [
    {
      id: string;
    },
  ];
}
export interface Status {
  id: string;
  status: 'read' | 'received';
}
export interface CounterState {
  messages: Messages[] | [];
  currentChatMessages: Messages[] | [];
  status: Status[] | [];
}

const initialState: CounterState = {
  messages: [],
  currentChatMessages: [],
  status: [],
};

export const GetMessages = createAsyncThunk<
  {success: true; messages: Messages[]} | {success: false; message: string},
  {to: string},
  AsyncThunkConfig
>('GetMessages', async ({to}, {dispatch}) => {
  try {
    const response = await fetch(`${apiUrl}/app/message?to=${to}`, {
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
    if (data?.success) {
      let AllMessages: any[] = [];
      for (let i = 0; i <= data.messagesStatus.length - 1; i++) {
        const readTime =
          data.messagesStatus[i].status === 'read'
            ? data.messagesStatus[i].date
            : undefined;
        const receivedTime =
          data.messagesStatus[i].status === 'received'
            ? data.messagesStatus[i].date
            : undefined;
        await Message.insertMessageInfoTable(
          data.messagesStatus[i].id,
          data.messagesStatus[i].sender,
          data.messagesStatus[i].status,
          readTime,
          receivedTime,
        );
        if (i === data.messagesStatus.length - 1) {
          await Message.insertManyMessages(data.messages);
          AllMessages = await Message.getMessage();
        }
      }
      if (data.messagesStatus.length === 0) {
        await Message.insertManyMessages(data.messages);
        AllMessages = await Message.getMessage();
      }
      data.messages.forEach((message: any) => {
        dispatch(
          MessageStatus({
            sender: message.to,
            status: 'received',
            date: new Date(),
            to: message.sender,
            id: message.id,
          }),
        );
      });
      const combinedMessages = AllMessages.sort(
        (a, b) => new Date(a?.date).getTime() - new Date(b?.date).getTime(),
      );
      return {success: true, messages: combinedMessages};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  reducers: {
    GetMessageById: (state, action: PayloadAction<{id: string}>) => {
      if (state.messages) {
        state.currentChatMessages = [
          ...state.messages.filter(e => {
            if (e.chatId === action.payload.id) {
              return true;
            }
            return false;
          }),
        ];
      }
    },
    AddMessage: (
      state,
      action: PayloadAction<{
        currentChat?: string;
        id: string;
        chatId: string;
        sender: string;
        message: string;
        isRead: boolean;
        date: string;
        reply: string;
      }>,
    ) => {
      if (!state.messages.some(message => message.id === action.payload.id)) {
        state.messages = [
          ...state.messages,
          {
            ...action.payload,
            read_count: 0,
            receive_count: 0,
          },
        ];
      }
      if (
        action.payload.currentChat &&
        action.payload.chatId === action.payload.currentChat
      ) {
        if (
          !state.currentChatMessages.some(
            currentChatMessage => currentChatMessage.id === action.payload.id,
          )
        ) {
          state.currentChatMessages = [
            ...state.currentChatMessages,
            {
              ...action.payload,
              read_count: 0,
              receive_count: 0,
            },
          ];
        }
      }
    },
    MarkRead: (state, action: PayloadAction<{id: string}>) => {
      state.messages = [
        ...state.messages.map(e =>
          e.id === action.payload.id ? {...e, isRead: true} : e,
        ),
      ];
      state.currentChatMessages = [
        ...state.currentChatMessages.map(e =>
          e.id === action.payload.id ? {...e, isRead: true} : e,
        ),
      ];
    },
    DeleteMessage: (state, action: PayloadAction<{id: string}>) => {
      state.messages = [
        ...state.messages.filter(e => e.id !== action.payload.id && e),
      ];
      state.currentChatMessages = [
        ...state.currentChatMessages.filter(
          e => e.id !== action.payload.id && e,
        ),
      ];
    },
    UpdateStatus: (
      state,
      action: PayloadAction<{id: string; status: 'read' | 'received'}>,
    ) => {
      const {status, id} = action.payload;
      const a = state.status.find(e => e.id === id && e.status === status);
      if (!a?.id) {
        state.messages = [
          ...state.messages.map(e => {
            if (e.id === action.payload.id) {
              const read_count =
                status === 'read' ? e.read_count + 1 : e.read_count;
              const receive_count =
                status === 'received' ? e.receive_count + 1 : e.receive_count;
              return {...e, read_count, receive_count};
            } else {
              return e;
            }
          }),
        ];
        state.currentChatMessages = [
          ...state.currentChatMessages.map(e => {
            if (e.id === action.payload.id) {
              const read_count =
                status === 'read' ? e.read_count + 1 : e.read_count;
              const receive_count =
                status === 'received' ? e.receive_count + 1 : e.receive_count;
              return {...e, read_count, receive_count};
            } else {
              return e;
            }
          }),
        ];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(GetMessages.fulfilled, (state, {payload}) => {
      if (payload?.success) {
        state.messages = payload.messages;
      }
    });
  },
});
export const {
  GetMessageById,
  AddMessage,
  MarkRead,
  DeleteMessage,
  UpdateStatus,
} = counterSlice.actions;

export default counterSlice.reducer;
