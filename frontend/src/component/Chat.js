import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ChatContainer from "./ChatContainer";
import { SocketContext } from "./SocketContext";

// import { io } from "socket.io-client";
// Socket connection:
// const ENDPOINT = "http://localhost:8000"; // Bakend url:
// const socket = io(ENDPOINT);

const Chat = () => {
  const [socketId, setSocketId] = useState(null);
  const location = useLocation();
  const formData = location.state || {};
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("info", (data) => {
      console.log("Info:", data);
    });

    socket.on("message", () => {
      setSocketId(socket.id);
    });

    console.log({ socket }, { socketId });

    return () => {
      socket.off("message");
      socket.off("info");
    };
  }, [socketId]);

  return (
    <div>
      <Navbar />
      <ChatContainer
        socketInfo={socket}
        userId={socketId}
        userInfo={formData}
      />
    </div>
  );
};

export default Chat;
