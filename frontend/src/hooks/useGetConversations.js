import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_BASE = import.meta.env.VITE_API_URL;

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			const token = JSON.parse(localStorage.getItem("chat-user"))?.token;

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

				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}

				setConversations(data);
			} catch (error) {
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
