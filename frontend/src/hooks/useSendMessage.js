// import { useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const API_BASE = import.meta.env.VITE_API_URL;

// const useSendMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const { setMessages, selectedConversation } = useConversation();

//   const sendMessage = async (message) => {
//     setLoading(true);
//     try {
//       const token = JSON.parse(localStorage.getItem("chat-user"))?.token;
//       if (!token) {
//         toast.error("No token provided");
//         return;
//       }

//       const res = await fetch(
//         `${API_BASE}/api/messages/send/${selectedConversation._id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ message }),
//         }
//       );

//       const data = await res.json();
//       if (data.error) throw new Error(data.error);

//       if (data.conversationId === selectedConversation._id) {
//         setMessages((prev) => [...prev, data]);
//       } else {
//         console.warn(
//           "Received message doesn't belong to selected conversation"
//         );
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { sendMessage, loading };
// };

// export default useSendMessage;

import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const API_BASE = import.meta.env.VITE_API_URL;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("chat-user"))?.token;
      if (!token) {
        toast.error("No token provided");
        return;
      }

      const res = await fetch(
        `${API_BASE}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.conversationId === selectedConversation._id) {
        setMessages((prev) => [...prev, data]);
      }

      socket?.emit("sendMessage", data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
