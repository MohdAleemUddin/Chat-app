// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoading(true);
// 			try {
// 				const res = await fetch(`/api/messages/${selectedConversation._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setMessages(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (selectedConversation?._id) getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };
// export default useGetMessages;

import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const API_BASE = import.meta.env.VITE_API_URL;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/messages/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.error) throw new Error(data.error);

        // ✅ Validate response is an array
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from server");
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch messages");
        setMessages([]); // ✅ Prevent crash
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
