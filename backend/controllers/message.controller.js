// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     conversation.messages.push(newMessage._id);

//     // Using Promise.all to save both in parallel
//     await Promise.all([conversation.save(), newMessage.save()]);

//     // SOCKET.IO FUNCTIONALITY
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate("messages");

//     if (!conversation) return res.status(200).json([]);

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       conversationId: conversation._id,
//     });

//     conversation.messages.push(newMessage._id);

//     await Promise.all([conversation.save(), newMessage.save()]);

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     const messageToSend = newMessage.toObject();

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", messageToSend);
//     }

//     io.to(senderId.toString()).emit("newMessage", messageToSend);

//     res.status(201).json(messageToSend);
//   } catch (error) {
//     console.log("Error in sendMessage controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate("messages");

//     if (!conversation) return res.status(200).json([]);

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in getMessages controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       conversationId: conversation._id,
//     });

//     conversation.messages.push(newMessage._id);
//     await Promise.all([conversation.save(), newMessage.save()]);

//     const populatedMessage = await Message.findById(newMessage._id)
//       .populate("senderId", "username profilePic")
//       .populate("receiverId", "username profilePic");

//     const receiverSocketId = getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", populatedMessage);
//     }

//     io.to(senderId.toString()).emit("newMessage", populatedMessage);

//     res.status(201).json(populatedMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };








// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";
// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//       console.log("🆕 New conversation created:", conversation._id.toString());
//     } else {
//       console.log(
//         "✅ Existing conversation found:",
//         conversation._id.toString()
//       );
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       conversationId: conversation._id,
//     });

//     conversation.messages.push(newMessage._id);
//     await Promise.all([conversation.save(), newMessage.save()]);

//     const populatedMessage = await Message.findById(newMessage._id)
//       .populate("senderId", "username profilePic")
//       .populate("receiverId", "username profilePic");

//     console.log("📨 Populated message being sent:");
//     console.log(
//       "    conversationId:",
//       populatedMessage.conversationId.toString()
//     );
//     console.log("    senderId:", populatedMessage.senderId?._id?.toString());
//     console.log(
//       "    receiverId:",
//       populatedMessage.receiverId?._id?.toString()
//     );

//     const receiverSocketId = getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//       console.log("📡 Emitting message to receiverSocketId:", receiverSocketId);
//       io.to(receiverSocketId).emit("newMessage", populatedMessage);
//     }

//     io.to(senderId.toString()).emit("newMessage", populatedMessage);
//     res.status(201).json(populatedMessage);
//   } catch (error) {
//     console.log("❌ Error in sendMessage controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate({
//       path: "messages",
//       populate: { path: "senderId receiverId", select: "username profilePic" },
//     });

//     if (!conversation) return res.status(200).json([]);

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("Error in getMessages controller:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };





// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//       console.log("🆕 New conversation created:", conversation._id.toString());
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       conversationId: conversation._id,
//     });

//     conversation.messages.push(newMessage._id);
//     await Promise.all([conversation.save(), newMessage.save()]);

//     const populatedMessage = await Message.findById(newMessage._id)
//       .populate("senderId", "username profilePic")
//       .populate("receiverId", "username profilePic");

//     console.log("📨 Populated message being sent:");
//     console.log("conversationId:", populatedMessage.conversationId.toString());

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       console.log("📡 Emitting to receiver:", receiverSocketId);
//       io.to(receiverSocketId).emit("newMessage", populatedMessage);
//     }

//     // ✅ Also emit back to sender (for syncing)
//     io.to(senderId.toString()).emit("newMessage", populatedMessage);

//     res.status(201).json(populatedMessage);
//   } catch (error) {
//     console.error("❌ sendMessage error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate({
//       path: "messages",
//       populate: { path: "senderId receiverId", select: "username profilePic" },
//     });

//     if (!conversation) return res.status(200).json([]);

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.error("getMessages error:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     console.log("💌 sendMessage called");
//     console.log("➡ senderId:", senderId?.toString());
//     console.log("➡ receiverId:", receiverId?.toString());
//     console.log("➡ message text:", message);

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//       console.log("🆕 New conversation created:", conversation._id.toString());
//     } else {
//       console.log("📂 Existing conversation found:", conversation._id.toString());
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//       conversationId: conversation._id,
//     });

//     conversation.messages.push(newMessage._id);
//     await Promise.all([conversation.save(), newMessage.save()]);

//     const populatedMessage = await Message.findById(newMessage._id)
//       .populate("senderId", "username profilePic")
//       .populate("receiverId", "username profilePic");

//     console.log("📨 Populated message prepared:", {
//       conversationId: populatedMessage?.conversationId?.toString(),
//       sender: populatedMessage?.senderId?.username,
//       receiver: populatedMessage?.receiverId?.username
//     });

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     console.log("🔍 getReceiverSocketId returned:", receiverSocketId || "❌ No socket found");

//     if (receiverSocketId) {
//       console.log("📡 Emitting 'newMessage' to receiver socket:", receiverSocketId);
//       io.to(receiverSocketId).emit("newMessage", populatedMessage);
//     } else {
//       console.log("⚠ Receiver is offline, skipping socket emit");
//     }

//     console.log("📡 Emitting 'newMessage' back to sender socket");
//     io.to(senderId.toString()).emit("newMessage", populatedMessage);

//     res.status(201).json(populatedMessage);
//   } catch (error) {
//     console.error("❌ sendMessage error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     console.log("📥 getMessages called between:", {
//       senderId: senderId?.toString(),
//       userToChatId
//     });

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate({
//       path: "messages",
//       populate: { path: "senderId receiverId", select: "username profilePic" },
//     });

//     if (!conversation) {
//       console.log("ℹ No conversation found, returning empty array");
//       return res.status(200).json([]);
//     }

//     console.log(`📄 Found ${conversation.messages.length} messages`);
//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.error("❌ getMessages error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };





import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("💌 sendMessage called");
    console.log("➡ senderId:", senderId?.toString());
    console.log("➡ receiverId:", receiverId?.toString());
    console.log("➡ message text:", message);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("🆕 New conversation created:", conversation._id.toString());
    } else {
      console.log("📂 Existing conversation found:", conversation._id.toString());
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      conversationId: conversation._id,
    });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "username profilePic")
      .populate("receiverId", "username profilePic");

    // ✅ Ensure conversationId is always a plain string
    if (populatedMessage?.conversationId) {
      populatedMessage.conversationId = populatedMessage.conversationId.toString();
    }

    console.log("📨 Populated message prepared:", {
      conversationId: populatedMessage?.conversationId,
      sender: populatedMessage?.senderId?.username,
      receiver: populatedMessage?.receiverId?.username
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("🔍 getReceiverSocketId returned:", receiverSocketId || "❌ No socket found");

    if (receiverSocketId) {
      console.log("📡 Emitting 'newMessage' to receiver socket:", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    } else {
      console.log("⚠ Receiver is offline, skipping socket emit");
    }

    console.log("📡 Emitting 'newMessage' back to sender socket");
    io.to(senderId.toString()).emit("newMessage", populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("❌ sendMessage error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("📥 getMessages called between:", {
      senderId: senderId?.toString(),
      userToChatId
    });

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: { path: "senderId receiverId", select: "username profilePic" },
    });

    if (!conversation) {
      console.log("ℹ No conversation found, returning empty array");
      return res.status(200).json([]);
    }

    console.log(`📄 Found ${conversation.messages.length} messages`);
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("❌ getMessages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
