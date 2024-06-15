import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Chat from "./component/Chat";
import { SocketProvider } from "./component/SocketContext";
// import { io } from "socket.io-client";

// Socket connection:
// const ENDPOINT = "http://localhost:8000"; // Bakend url:
// const socket = io(ENDPOINT);

function App() {
  // socket.on("connection", () => {
  //   console.log("New connections");
  // });

  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
