import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;

// import express from "express";
// const router = express.Router();

// import Message from "../models/message.model.js"; // Adjusted for ES Module
// import protectRoute from "../middleware/protectRoute.js"; // Adjusted for ES Module

// // Get all messages for a conversation
// router.get("/:conversationId", protectRoute, async (req, res) => {
//   try {
//     const messages = await Message.find({
//       conversation: req.params.conversationId,
//     })
//       .populate("sender", "name email") // Adjusted for the data you want to return
//       .sort({ createdAt: 1 });

//     if (!messages) {
//       return res.status(404).json({ error: "Messages not found" });
//     }

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// });

// // Send a new message
// router.post("/send", protectRoute, async (req, res) => {
//   try {
//     const { conversationId, content } = req.body;
//     const message = new Message({
//       sender: req.user.id,
//       conversation: conversationId,
//       content,
//     });

//     const savedMessage = await message.save();
//     res.status(201).json(savedMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send message" });
//   }
// });

// export default router;
