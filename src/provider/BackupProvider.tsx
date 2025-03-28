import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { useSocket } from "../provider";
import { useAppDispatch } from "../hooks/hooks";
import FuncionMap from "../backup/FunctionMapper/FuncionMap";

type BackupData = {
  table: string;
  _id: string[];
  parentIds?: string[];
  parents?: string;
};

const BackupContext = createContext<{ addToQueue: (data: BackupData) => void } | null>(null);

export const BackupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { socket, isConnected } = useSocket();
  const dispatch = useAppDispatch();

  const [backupQueue, setBackupQueue] = useState<BackupData[]>([]);
  const processingRef = useRef(false); // Avoid unnecessary re-renders
  const isListenerAttached = useRef(false); // Track event listener status

  console.log("🔌 Socket Connected:", isConnected);

  // Function to add data to queue
  const addToQueue = useCallback((data: BackupData) => {
    setBackupQueue((prevQueue) => {
      const exists = prevQueue.some(
        (item) => item.table === data.table && item._id[0] === data._id[0]
      );
      return exists ? prevQueue : [...prevQueue, data]; // Prevent duplicate entries
    });
  }, []);

  // Attach socket listener once
  useEffect(() => {
    if (socket && !isListenerAttached.current) {
      console.log("✅ Attaching socket event listener...");

      socket.on("updateDatabasedetails", (data: BackupData[]) => {
        data.forEach(addToQueue);
      });

      isListenerAttached.current = true; // Prevent duplicate listeners
    }

    return () => {
      if (socket && isListenerAttached.current) {
        console.log("🛑 Removing socket event listener...");
        socket.off("updateDatabasedetails");
        isListenerAttached.current = false;
      }
    };
  }, [socket, addToQueue]);

  // Function to process queue items one by one
  const processQueue = useCallback(async () => {
    if (processingRef.current || backupQueue.length === 0) return;
    processingRef.current = true;

    const data = backupQueue[0]; 
    console.log("🔁 Processing queue item:", backupQueue);
    

    try {
      const functionName = FuncionMap[data.table];
      if (functionName) {
        await functionName(dispatch, data._id[0], data.parentIds || []);

        if (data.parents) {
          const parentFunction = FuncionMap[data.parents];
          await parentFunction(dispatch, data._id[0], data.parentIds ? [data.parentIds[0]] : []);
        }
      } else {
        console.warn("⚠️ No function found for table:", data.table);
      }
    } catch (error) {
      console.error(`❌ Error processing ${data.table}:`, error);
    }

    // Remove the first item from the queue
    setBackupQueue((prevQueue) => prevQueue.slice(1));

    processingRef.current = false; // Ensure this is reset
  }, [backupQueue, dispatch]);

  // Run queue processing when there is new data
  useEffect(() => {
    if (!processingRef.current && backupQueue.length > 0) {
      processQueue();
    }
  }, [backupQueue, processQueue]);

  return (
    <BackupContext.Provider value={{ addToQueue }}>
      {children}
    </BackupContext.Provider>
  );
};

// Custom hook to access the Backup Context
export const useBackupContext = () => {
  const context = useContext(BackupContext);
  if (!context) {
    throw new Error("useBackupContext must be used within a BackupProvider");
  }
  return context;
};