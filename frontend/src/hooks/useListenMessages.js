import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages, conversations } =
    useConversation();

  useEffect(() => {
    if (!socket || !selectedConversation?._id) {
      console.warn(
        "🔁 useListenMessages skipped: Socket or selectedConversation._id not ready"
      );
      return;
    }

    const handleNewMessage = (newMessage) => {
      const incomingId = String(newMessage.conversationId);
      const selectedId = String(selectedConversation._id);

      console.log("🟡 Incoming message for conversationId:", incomingId);
      console.log("🟢 Currently selected conversationId:", selectedId);

      const sound = new Audio(notificationSound);
      sound.play().catch((err) => console.log("🔇 Sound error:", err));

      if (incomingId === selectedId) {
        setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
      } else {
        const senderId = newMessage.senderId;

        const otherUser = conversations
          ?.find((conv) => conv._id === incomingId)
          ?.participants?.find((p) => p._id !== senderId);

        const senderName = otherUser?.fullName || "Another user";

        toast.success(`📨 New message from ${senderName}`, {
          duration: 4000,
          position: "bottom-right",
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation?._id, setMessages, conversations]);
};

export default useListenMessages;
