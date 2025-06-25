import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    if (!socket || !selectedConversation?._id) {
      console.warn(
        "🔁 useListenMessages skipped: Socket or selectedConversation._id not ready"
      );
      return;
    }

    const handleNewMessage = (newMessage) => {
      const incomingId = String(newMessage.conversationId);
      const selectedId = String(selectedConversation?._id);

      console.log("🟡 Incoming message for conversationId:", incomingId);
      console.log("🟢 Currently selected conversationId:", selectedId);

      if (incomingId !== selectedId) {
        console.warn(
          "⚠️ Message skipped. Doesn't belong to selected conversation."
        );
        return;
      }

      const sound = new Audio(notificationSound);
      sound.play().catch((err) => console.log("🔇 Sound error:", err));

      setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation?._id, setMessages]);
};

export default useListenMessages;
