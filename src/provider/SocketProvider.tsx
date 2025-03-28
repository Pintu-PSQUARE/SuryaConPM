import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { DEVSOCKET } from "../config/Env";
import { getCookie } from "../utils/CookieUtils";
import { useAppSelector } from "../hooks/hooks";

// ✅ Socket Configuration
const SOCKET_CONFIG = {
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 2000,
  TIMEOUT: 10000,
};

// ✅ Socket State Interface
interface SocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

// ✅ Actions
type SocketAction =
  | { type: "CONNECTING" }
  | { type: "CONNECTED" }
  | { type: "DISCONNECTED" }
  | { type: "ERROR"; payload: string };

// ✅ Context Type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

// ✅ Reducer Function
const socketReducer = (state: SocketState, action: SocketAction): SocketState => {
  switch (action.type) {
    case "CONNECTING":
      return { ...state, connecting: true };
    case "CONNECTED":
      return { connected: true, connecting: false, error: null };
    case "DISCONNECTED":
      return { connected: false, connecting: false, error: null };
    case "ERROR":
      return { ...state, error: action.payload, connecting: false };
    default:
      return state;
  }
};

// ✅ Create Context
const SocketContext = createContext<SocketContextType | null>(null);

// ✅ Provider Component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, {
    connected: false,
    connecting: false,
    error: null,
  });

  const socketRef = useRef<Socket | null>(null);
  const {isAuthenticated} = useAppSelector(state => state.userStore);
  // ✅ Initialize Socket Connection
  const initializeSocket = useCallback(async () => {
    if (!isAuthenticated || socketRef.current?.connected) return; 
    dispatch({ type: "CONNECTING" });

    try {
      const cookiesString = await getCookie();
      const socket = io(DEVSOCKET, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
        reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
        timeout: SOCKET_CONFIG.TIMEOUT,
        withCredentials: true,
        extraHeaders: { Cookie: cookiesString || "" },
        path: "/developmentsocket",
      });

      socketRef.current = socket;

      socket.on("connect", () => dispatch({ type: "CONNECTED" }));
      socket.on("disconnect", () => dispatch({ type: "DISCONNECTED" }));
      socket.on("connect_error", (error) => dispatch({ type: "ERROR", payload: error.message }));
    } catch (error) {
      dispatch({ type: "ERROR", payload: (error as Error).message || "Connection error" });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      initializeSocket();
    } else {
      socketRef.current?.disconnect(); 
      dispatch({ type: "DISCONNECTED" });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isAuthenticated, initializeSocket]);

  const contextValue = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected: state.connected,
      connect: initializeSocket,
      disconnect: () => socketRef.current?.disconnect(),
    }),
    [state.connected, initializeSocket]
  );

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

// ✅ Hook to Use Socket
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within a SocketProvider");
  return context;
};

export default SocketProvider;