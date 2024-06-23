import React, { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "./SocketContext";
import Popup from "./Popup";

const ChatContainer = (props) => {
  // Popup:
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Input Field:
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  // Message:
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const { username, gender } = props?.userInfo;
  const socket = useContext(SocketContext);

  console.info({ socket }, { id: socket.id });

  useEffect(() => {
    socket.emit("start-chat", (data) => {
      console.info("Message: ", data);
    });

    socket.on("info", (data) => {
      setPopupMessage(data.message);
      setShowPopup(true);
      console.info({ data });

      if (data.textField) {
        setIsInputEnabled(true);
      } else {
        setIsInputEnabled(false);
        setMessages([]);
      }
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
      socket.off("info");
      socket.off("start-chat");
    };
  }, [socket]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle message:
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      text: newMessage,
      sender: socket.id,
      username: username?.charAt(0) || "S",
      gender,
      key: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    socket.emit("message", message);
    setNewMessage("");
  };

  // Eneter Key Press:
  const handleKeyDown = (e) => {
    console.log(`Key pressed: ${e.key}`);
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action (e.g., form submission)
      handleSendMessage();
    }
  };

  // Handler to close popup:
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="h-screen flex flex-col flex-auto h-full p-6 scrollbar-hide">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid-cols-12 gap-y-2">
                {showPopup && (
                  <Popup message={popupMessage} onClose={handleClosePopup} />
                )}
                {messages.map((message) => (
                  <div
                    key={message.key}
                    className={`flex ${
                      message.sender === socket.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        message.sender === socket.id
                          ? "justify-start flex-row-reverse"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
                        {message.username}
                      </div>
                      <div
                        className={`relative ml-3 text-sm py-2 px-4 shadow rounded-xl ${
                          message.sender === socket.id
                            ? "bg-indigo-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        <div>{message.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          {/* This is for message input body fields! */}
          <div className="sticky bottom-0 bg-gray-100 p-4">
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className={`flex w-full border rounded-xl pl-4 h-10 ${
                      isInputEnabled
                        ? "bg-white border-indigo-300 focus:outline-none"
                        : "bg-gray-300 border-gray-300 cursor-not-allowed"
                    }`}
                    value={newMessage}
                    disabled={!isInputEnabled}
                    placeholder={
                      isInputEnabled
                        ? "Type your message..."
                        : "Wait till your partner joining.."
                    }
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  onClick={handleSendMessage}
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;
