import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { io } from "socket.io-client";

let socket;

export default function Chats() {
  useEffect(() => {
    socket = io("http://localhost:5000");

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <Navbar />
      <h1>This is room chat</h1>
    </div>
  );
}
