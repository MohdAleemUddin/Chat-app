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

// import { useEffect, useRef } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { selectedConversation, addMessage } = useConversation();
//   const selectedConversationIdRef = useRef(selectedConversation?._id || null);

//   useEffect(() => {
//     selectedConversationIdRef.current = selectedConversation?._id || null;
//   }, [selectedConversation?._id]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       console.log("📥 New message received:", newMessage);

//       // Play notification
//       new Audio(notificationSound)
//         .play()
//         .catch((err) => console.warn("🔇 Sound playback failed:", err));

//       const currentConvId = selectedConversationIdRef.current;

//       // If the current open conversation matches the message's conversation, show instantly
//       if (newMessage.conversationId?.toString() === currentConvId?.toString()) {
//         addMessage({ ...newMessage, shouldShake: true });
//         console.log("✅ Message added instantly for current conversation.");
//       } else {
//         console.log(
//           "📩 Message belongs to another conversation — could store as unread."
//         );
//         // Optional: store in an "unread" state here
//       }
//     };

//     socket.on("newMessage", handleNewMessage);
//     console.log("✅ Listener attached for newMessage");

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       console.log("🧹 Listener removed for newMessage");
//     };
//   }, [socket, addMessage]);
// };

// export default useListenMessages;

// import { useEffect, useRef } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { selectedConversation, addMessage } = useConversation();
//   const selectedConversationIdRef = useRef(selectedConversation?._id || null);

//   useEffect(() => {
//     selectedConversationIdRef.current = selectedConversation?._id || null;
//     console.log("🆕 Updated current conversation ref:", selectedConversationIdRef.current);
//   }, [selectedConversation?._id]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       console.log("📥 New message received:", newMessage);

//       // Play notification
//       new Audio(notificationSound)
//         .play()
//         .catch((err) => console.warn("🔇 Sound playback failed:", err));

//       const currentConvId = selectedConversationIdRef.current;

//       console.log("🔍 Debug IDs:");
//       console.log("   - newMessage.conversationId:", newMessage.conversationId);
//       console.log("   - typeof:", typeof newMessage.conversationId);
//       console.log("   - currentConvId (ref):", currentConvId);
//       console.log("   - typeof:", typeof currentConvId);
//       console.log(
//         "   - Loose equality check (==):",
//         newMessage.conversationId == currentConvId
//       );
//       console.log(
//         "   - Strict equality check (===):",
//         newMessage.conversationId === currentConvId
//       );
//       console.log(
//         "   - String comparison:",
//         newMessage.conversationId?.toString() === currentConvId?.toString()
//       );

//       // If the current open conversation matches the message's conversation, show instantly
//       if (newMessage.conversationId == currentConvId) {
//         addMessage({ ...newMessage, shouldShake: true });
//         console.log("✅ Message added instantly for current conversation.");
//       } else {
//         console.log(
//           "📩 Message belongs to another conversation — could store as unread."
//         );
//       }
//     };

//     socket.on("newMessage", handleNewMessage);
//     console.log("✅ Listener attached for newMessage");

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//       console.log("🧹 Listener removed for newMessage");
//     };
//   }, [socket, addMessage]);
// };

// export default useListenMessages;

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
      console.log("🔍 Debug IDs:");
      console.log("   - newMessage.conversationId:", newMessage.conversationId);
      console.log("   - typeof:", typeof newMessage.conversationId);
      console.log("   - currentConvId (ref):", selectedConversation?._id);
      console.log("   - typeof:", typeof selectedConversation?._id);

      // Convert both IDs to strings before comparison
      const convIdFromMsg = newMessage.conversationId?.toString();
      const convIdFromState = selectedConversation?._id?.toString();

      console.log(
        "   - Loose equality check (==):",
        convIdFromMsg == convIdFromState
      );
      console.log(
        "   - Strict equality check (===):",
        convIdFromMsg === convIdFromState
      );
      console.log(
        "   - String comparison:",
        String(convIdFromMsg) === String(convIdFromState)
      );

      if (convIdFromMsg === convIdFromState) {
        setMessages([...messages, newMessage]);
        playNotificationSound();
      } else {
        console.log(
          "📩 Message belongs to another conversation — could store as unread."
        );
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, selectedConversation, setMessages]);

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((err) => console.error("🔇 Failed to play sound:", err));
  };
};

export default useListenMessages;
