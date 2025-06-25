import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation, messages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      const token = JSON.parse(localStorage.getItem("chat-user"))?.token;
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/messages/${selectedConversation._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (data.error) throw new Error(data.error);
        if (!Array.isArray(data)) throw new Error("Invalid response format");

        setMessages(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);

  return { loading, messages };
};

export default useGetMessages;
