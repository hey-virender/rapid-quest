import { create } from "zustand";

const useStore = create((set) => ({
  conversations: [],
  currentConversation: null,

  setConversations: (conversations) => set({ conversations }),

  setCurrentConversation: (conversationId) =>
    set((state) => {
      const updatedConversations = state.conversations.map((conversation) =>
        conversation._id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      );
  
      return {
        conversations: updatedConversations,
        currentConversation:
          updatedConversations.find(
            (conversation) => conversation._id === conversationId
          ) || null,
      };
    }),

    updateMessage: (message, conversationId) =>
      set((state) => {
        const updatedConversations = state.conversations.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, message],
              lastMessage: message, // 🔹 update lastMessage
              latestMessageTime: message.createdAt || Date.now(), // 🔹 update latestMessageTime
            };
          }
          return conversation;
        });
    
        const updatedCurrentConversation =
          state.currentConversation?._id === conversationId
            ? {
                ...state.currentConversation,
                messages: [...state.currentConversation.messages, message],
                lastMessage: message,
                latestMessageTime: message.createdAt || Date.now(),
              }
            : state.currentConversation;
    
        return {
          conversations: updatedConversations,
          currentConversation: updatedCurrentConversation,
        };
      }),
}));

export default useStore;
