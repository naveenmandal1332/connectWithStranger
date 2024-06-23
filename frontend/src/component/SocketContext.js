import React, { createContext } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; // Backend url
const socket = io(ENDPOINT);

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
