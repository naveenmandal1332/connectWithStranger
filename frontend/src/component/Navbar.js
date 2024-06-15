import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";

const Navbar = () => {
  const [users, setUsers] = useState(0);
  const socket = useContext(SocketContext);

  // Handle Total Active User:
  useEffect(() => {
    socket.on("active-user", (data) => {
      setUsers(data.activeUser);
    });
  }, [users]);

  return (
    <div className="p-2 flex bg-violet-100 max-w-xxl shadow-lg">
      <div className="flex-grow">
        <div className="flex space-x-2">
          <div>
            <img
              className="h-20 w-20 rounded-lg"
              src={
                "https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/1f/76/70/1f767010-5546-710c-87a1-d4dcbda8ad3d/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
              }
              alt="connect-with-stranger-logo"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium text-black">
              Connect With Stranger
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ul className="flex text-xl font-medium text-black">
          <li className="mr-4 hover:text-blue-500">Home</li>
          <li className="mr-4 hover:text-blue-500">About</li>
          <li className="mr-4 hover:text-blue-500">Let's Talk</li>
          <li className="mr-4 text-green-500">{users} Online</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
