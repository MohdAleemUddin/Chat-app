
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();

//   console.log("Message senderId:", message.senderId);
//   console.log("Auth user ID:", authUser._id);

//   const senderId =
//     typeof message.senderId === "string"
//       ? message.senderId
//       : message.senderId?._id || "";

//   const fromMe = senderId === authUser._id;

//   const profilePic = fromMe
//     ? authUser.profilePic
//     : selectedConversation?.profilePic || "";
//   const formattedTime = extractTime(message.createdAt);

//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const bubbleBgColor = fromMe
//     ? "bg-blue-500 text-white"
//     : "bg-gray-200 text-black";
//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img src={profilePic} alt="Profile" />
//         </div>
//       </div>
//       <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}>
//         {message.message}
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//         {formattedTime}
//       </div>
//     </div>
//   );
// };

// export default Message;

import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const senderId = typeof message.senderId === "string"
    ? message.senderId
    : message.senderId?._id;

  const fromMe = senderId === authUser._id;
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const formattedTime = extractTime(message.createdAt);
  const chatPosition = fromMe ? "chat-end" : "chat-start";
  const bubbleStyle = fromMe
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-black";

  return (
    <div className={`chat ${chatPosition}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Profile" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleStyle}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

