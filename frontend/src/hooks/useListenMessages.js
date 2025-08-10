import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("📥 New message received:", newMessage);

      if (!selectedConversation) {
        console.log("ℹ No conversation selected — skipping");
        return;
      }

      const senderId = newMessage?.senderId?._id?.toString();
      const receiverId = newMessage?.receiverId?._id?.toString();
      const selectedUserId = selectedConversation?._id?.toString();
      const myUserId = authUser?._id?.toString();

      console.log("🔍 Debug IDs:");
      console.log("   - newMessage.senderId:", senderId);
      console.log("   - newMessage.receiverId:", receiverId);
      console.log("   - selectedConversation._id:", selectedUserId);
      console.log("   - myUserId:", myUserId);

      // ✅ Fix: Match based on sender/receiver instead of conversationId
      const isCurrentChatMessage =
        (senderId === selectedUserId && receiverId === myUserId) ||
        (receiverId === selectedUserId && senderId === myUserId);

      console.log("   - Is current chat message?", isCurrentChatMessage);

      if (isCurrentChatMessage) {
        setMessages([...messages, newMessage]);
        playNotificationSound();
      } else {
        console.log(
          "📩 Message belongs to another chat — could store as unread."
        );
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, selectedConversation, setMessages, authUser]);

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((err) => console.error("🔇 Failed to play sound:", err));
  };
};

export default useListenMessages;
