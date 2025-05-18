// import { useEffect } from "react";

// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			newMessage.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
// 			setMessages([...messages, newMessage]);
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages, messages]);
// };
// export default useListenMessages;

import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { setMessages } = useConversation();

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (newMessage) => {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play().catch((err) => console.log("Audio Play Error: ", err));
				// Using functional state update
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			});
		}

		// Clean up the listener
		return () => {
			socket?.off("newMessage");
		};
	}, [socket, setMessages]);
};

export default useListenMessages;
