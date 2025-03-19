import { createSlice } from "@reduxjs/toolkit"
import  io, { Socket }  from "socket.io-client"
import { ENDPOINT } from "../config/Env";


const initialState = {
    socketData: null,
}

const SocketReducer = createSlice({
    name: "socket",
    initialState,
    reducers: {
        Initialize: (state, { payload }) => {
            state.socketData = io(ENDPOINT);
            state?.socketData?.emit("setup", payload);
        },
        socketDisconnect: (state,{payload}) => {
            // state?.socketData?.emit("manualDisconnect", payload);
            state?.socketData?.disconnect(); 
        },
        SendMessage: (state, { payload }) => {
            state.socketData?.emit("message", payload);
        },
        MessageStatus: (state, { payload }) => {
            state.socketData?.emit("messageStatus", payload);
        },
       
    }
})
export const { Initialize, OnLoginEmit,socketDisconnect, ChatRequest, SendMessage, MessageStatus } = SocketReducer.actions
export default SocketReducer.reducer


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // Create a context for the socket
// const SocketContext = createContext();

// export const useSocket = () => {
//     return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const socketInstance = io(ENDPOINT);
//         setSocket(socketInstance);

//         // Clean up on component unmount
//         return () => {
//             socketInstance.disconnect();
//         };
//     }, []);

//     return (
//         <SocketContext.Provider value={socket}>
//             {children}
//         </SocketContext.Provider>
//     );
// };
