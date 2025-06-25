import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const API_BASE = import.meta.env.VITE_API_URL;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation, messages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("chat-user");
      const token = storedUser ? JSON.parse(storedUser).token : null;

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

      // ✅ FIX: Append message to existing list
      setMessages((prevMessages) => [...prevMessages, data]);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

