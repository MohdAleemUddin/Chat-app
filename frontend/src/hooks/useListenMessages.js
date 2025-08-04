// import { useEffect, useRef } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { selectedConversation, setMessages } = useConversation();

//   const selectedConversationIdRef = useRef(null);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       const currentConvId = selectedConversationIdRef.current;
//       console.log("📥 New message received:", newMessage);

//       const sound = new Audio(notificationSound);
//       sound
//         .play()
//         .catch((err) => console.warn("🔇 Sound playback failed:", err));

//       // Log IDs for debugging
//       console.log("🆔 Comparing IDs", {
//         messageId: newMessage.conversationId?.toString(),
//         selectedId: currentConvId?.toString(),
//       });

//       // ⬇️ Debug selectedConversation ID
//       console.log("📌 selectedConversation._id:", selectedConversation._id);

//       // ✅ Uncomment this block when filtering is needed
//       /*
//       if (newMessage.conversationId?.toString() === currentConvId?.toString()) {
//         setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
//         console.log("✅ Message added to UI immediately.");
//       } else {
//         console.log("📩 Message is for a different conversation.");
//       }
//       */

//       // 🔧 TEMP: Add all messages (skip filtering)
//       setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
//       console.log("🧪 TEMP: Added message regardless of conversation.");
//     };

//     socket.on("newMessage", handleNewMessage);
//     console.log("✅ Listener attached for newMessage");

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       console.log("🧹 Listener removed for newMessage");
//     };
//   }, [socket, setMessages]);

//   useEffect(() => {
//     selectedConversationIdRef.current = selectedConversation?._id;
//   }, [selectedConversation?._id]);
// };

// export default useListenMessages;



import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages } = useConversation();

  const selectedConversationIdRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const currentConvId = selectedConversationIdRef.current;
      console.log("📥 New message received:", newMessage);

      const sound = new Audio(notificationSound);
      sound
        .play()
        .catch((err) => console.warn("🔇 Sound playback failed:", err));

      // Log IDs for debugging
      console.log("🆔 Comparing IDs", {
        messageId: newMessage.conversationId?.toString(),
        selectedId: currentConvId?.toString(),
      });

      console.log("📌 selectedConversation._id:", selectedConversation._id);

      // ✅ Filter messages by selected conversation
      if (newMessage.conversationId?.toString() === currentConvId?.toString()) {
        setMessages((prev) => [...prev, { ...newMessage, shouldShake: true }]);
        console.log("✅ Message added to UI for current conversation.");
      } else {
        console.log("📩 Message is for a different conversation. Ignored.");
      }
    };

    socket.on("newMessage", handleNewMessage);
    console.log("✅ Listener attached for newMessage");

    return () => {
      socket.off("newMessage", handleNewMessage);
      console.log("🧹 Listener removed for newMessage");
    };
  }, [socket, setMessages]);

  useEffect(() => {
    selectedConversationIdRef.current = selectedConversation?._id;
  }, [selectedConversation?._id]);
};

export default useListenMessages;

