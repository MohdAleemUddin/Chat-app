import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_BASE = import.meta.env.VITE_API_URL;

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const userData = JSON.parse(localStorage.getItem("chat-user"));
      const token = userData?.token;

      console.log("🔍 LocalStorage chat-user:", userData);
      console.log("🔍 Token being sent:", token);

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 Request URL:", `${API_BASE}/api/users`);
        console.log("📡 Request Headers:", {
          Authorization: `Bearer ${token}`,
        });

        const data = await res.json();
        console.log("📩 API Response:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        console.error("❌ Error fetching conversations:", error);
        toast.error(error.message || "Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
