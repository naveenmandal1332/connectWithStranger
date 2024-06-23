import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  const location = useLocation();
  const formData = location.state || {};

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed w-full top-0 z-10">
        <Navbar />
      </div>
      <div className="flex-grow mt-24">
        <ChatContainer userInfo={formData} />
      </div>
    </div>
  );
};

export default Chat;
