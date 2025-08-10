// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;

// import { create } from "zustand";

// const useConversation = create((set, get) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),
//   messages: [],
//   setMessages: (messages) => set({ messages }),
//   addMessage: (message) => {
//     const currentMessages = get().messages;
//     set({ messages: [...currentMessages, message] });
//   },
// }));

// export default useConversation;

import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation, messages: [] }); // Reset messages when switching conversation
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => {
    const currentMessages = get().messages;
    set({ messages: [...currentMessages, message] });
  },
}));

export default useConversation;
