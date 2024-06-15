import React from "react";
import Navbar from "./Navbar";
import Login from "./Login";

const Home = () => {
  // socket.on("connection", (socket) => {
  //   console.log("Socket-->", socket);
  //   console.log("User is connected");
  // });

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* login form */}
      <Login />
      {/* home page body */}
      {/* footer */}
    </div>
  );
};

export default Home;
