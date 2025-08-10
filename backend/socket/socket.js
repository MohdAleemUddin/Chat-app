// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   // cors: {
//   // 	origin: ["http://localhost:3000", ],
//   // 	methods: ["GET", "POST"],
//   // },
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId: socketId}

// // io.on("connection", (socket) => {
// //   console.log("a user connected", socket.id);

// //   const userId = socket.handshake.query.userId;
// //   if (userId != "undefined") userSocketMap[userId] = socket.id;

// //   // io.emit() is used to send events to all the connected clients
// //   io.emit("getOnlineUsers", Object.keys(userSocketMap));

// //   // socket.on() is used to listen to the events. can be used both on client and server side
// //   socket.on("disconnect", () => {
// //     console.log("user disconnected", socket.id);
// //     delete userSocketMap[userId];
// //     io.emit("getOnlineUsers", Object.keys(userSocketMap));
// //   });
// // });
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (!userId) {
//     console.log("User ID not provided, disconnecting...");
//     socket.disconnect();
//     return; // Disconnect if no userId is provided
//   }

//   console.log("User connected with ID:", userId);
//   userSocketMap[userId] = socket.id;

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";

// const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://chat-app-aleem.netlify.app",
// ];
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // { userId: socketId }

// io.on("connection", (socket) => {
//   console.log("✅ User connected:", socket.id);

//   const userId = socket.handshake.query.userId;

//   if (!userId || userId === "undefined") {
//     console.log("⛔ User ID not provided or invalid, disconnecting...");
//     socket.disconnect();
//     return;
//   }

//   userSocketMap[userId] = socket.id;
//   console.log("🟢 User registered:", userId);

//   // Send current online users to all clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { app, io, server };

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-app-aleem.netlify.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("✅ [Socket] User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (!userId || userId === "undefined") {
    console.log("⛔ [Socket] Invalid userId. Disconnecting...");
    socket.disconnect();
    return;
  }

  userSocketMap[userId] = socket.id;
  console.log("🟢 [Socket] User registered:", userId);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ [Socket] User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
