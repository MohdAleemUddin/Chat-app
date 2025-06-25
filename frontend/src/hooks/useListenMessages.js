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
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const { selectedConversation, setMessages } = useConversation.getState();

      // Update only if the message belongs to the currently open conversation
      if (selectedConversation?._id === newMessage.conversationId) {
        newMessage.shouldShake = true;

        // Play notification sound
        const sound = new Audio(notificationSound);
        sound.play().catch((err) => console.log("Audio Play Error: ", err));

        // ✅ Update messages with latest state and log
        setMessages((prevMessages) => {
          const updated = [...prevMessages, newMessage];
          console.log("✅ Updated messages in useListenMessages:", updated);
          return updated;
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    // Clean up the listener on unmount
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);
};

export default useListenMessages;
