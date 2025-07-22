// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();

//   useEffect(() => {
//     if (authUser) {
//       console.log("Connecting to socket with userId:", authUser._id);
//       const newSocket = io("https://chat-app-backend-ic42.onrender.com", {
//         query: {
//           userId: authUser._id,
//         },
//       });

//       setSocket(newSocket);

//       newSocket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       // Clean up function
//       return () => {
//         newSocket.disconnect();
//         setSocket(null);
//       };
//     }
//   }, [authUser]);

//   useEffect(() => {
//     if (socket) {
//       console.log("Socket connected:", socket.connected);
//       socket.on("connect", () => console.log("Socket.IO connect event"));
//       socket.on("disconnect", (reason) =>
//         console.log("Socket disconnected:", reason)
//       );
//     }
//   }, [socket]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const { setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("https://chat-app-backend-ic42.onrender.com", {
        query: { userId: authUser._id },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("newMessage", (newMessage) => {
        if (newMessage.conversationId === selectedConversation?._id) {
          setMessages((prev) => [...prev, newMessage]);
        }
      });

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [authUser, selectedConversation]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
