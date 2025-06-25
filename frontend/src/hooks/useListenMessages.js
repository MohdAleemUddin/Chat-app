// import { useEffect } from "react";

// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { setMessages } = useConversation();

// 	useEffect(() => {
// 		if (socket) {
// 			socket.on("newMessage", (newMessage) => {
// 				newMessage.shouldShake = true;
// 				const sound = new Audio(notificationSound);
// 				sound.play().catch((err) => console.log("Audio Play Error: ", err));
// 				// Using functional state update
// 				setMessages((prevMessages) => [...prevMessages, newMessage]);
// 			});
// 		}

// 		// Clean up the listener
// 		return () => {
// 			socket?.off("newMessage");
// 		};
// 	}, [socket, setMessages]);
// };

// export default useListenMessages;

import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        const { selectedConversation, setMessages, messages } =
          useConversation.getState();

        // Only update if message belongs to currently open conversation
        if (selectedConversation?._id === newMessage.conversationId) {
          const sound = new Audio(notificationSound);
          sound.play().catch((err) => console.log("Audio Play Error: ", err));

          newMessage.shouldShake = true;
          setMessages([...messages, newMessage]);
        }
      });
    }

    return () => socket?.off("newMessage");
  }, [socket]);
};

export default useListenMessages;
