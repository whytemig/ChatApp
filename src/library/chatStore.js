import { create } from "zustand";
import { useUserStore } from "../library/useStore";

export const useChatStore = create((set) => ({
  chatId: null,
  aUser: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, aUser) => {
    const user = useUserStore.getState().user;

    // CHECK IF CURRENT USER IS BLOCKED
    if (aUser?.block.includes(user.id)) {
      return set({
        chatId,
        aUser: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (user.block.includes(aUser.id)) {
      return set({
        chatId,
        aUser: aUser,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        aUser,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
  resetChat: () => {
    set({
      chatId: null,
      aUser: null,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
}));
