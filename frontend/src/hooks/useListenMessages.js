import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId !== selectedConversation?._id) return;

      const sound = new Audio(notificationSound);
      sound.play().catch((err) => console.log("Sound error:", err));

      setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation?._id, setMessages]);
};

export default useListenMessages;
