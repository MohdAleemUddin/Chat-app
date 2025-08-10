// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import useListenMessages from "../../hooks/useListenMessages";
// import Message from "./Message";
//  import MessageSkeleton from "../skeletons/MessageSkeleton";

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   useListenMessages();
//   const lastMessageRef = useRef();

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading &&
//         Array.isArray(messages) &&
//         messages.length > 0 &&
//         messages.map((message, index) => (
//           <div
//             key={message._id || index}
//             ref={index === messages.length - 1 ? lastMessageRef : null}
//           >
//             <Message message={message} />
//           </div>
//         ))}

//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

//       {!loading && Array.isArray(messages) && messages.length === 0 && (
//         <p className="text-center">Send a message to start the conversation</p>
//       )}
//     </div>
//   );
// };

// export default Messages;

// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import useListenMessages from "../../hooks/useListenMessages";
// import useConversation from "../../zustand/useConversation";
// import Message from "./Message";
// import MessageSkeleton from "../skeletons/MessageSkeleton";

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   const { messages: storeMessages } = useConversation();
//   useListenMessages();
//   const lastMessageRef = useRef();

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [storeMessages]);

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading &&
//         storeMessages.length > 0 &&
//         storeMessages.map((message, index) => (
//           <div
//             key={message._id || index}
//             ref={index === storeMessages.length - 1 ? lastMessageRef : null}
//           >
//             <Message message={message} />
//           </div>
//         ))}

//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

//       {!loading && storeMessages.length === 0 && (
//         <p className="text-center">Send a message to start the conversation</p>
//       )}
//     </div>
//   );
// };

// export default Messages;

import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { messages: storeMessages } = useConversation();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    console.log(
      "💬 [Messages] Store messages updated:",
      storeMessages.map((m) => m.message)
    );
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [storeMessages]);

  console.log("🖼 [Messages] Rendering messages component. Loading:", loading);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        storeMessages.length > 0 &&
        storeMessages.map((message, index) => (
          <div
            key={message._id || index}
            ref={index === storeMessages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && storeMessages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
