import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "./firebase";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: true,
  fetchUserInfo: async (id) => {
    if (!id) return set({ user: null, isLoading: false });

    try {
      const docRef = doc(database, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ user: docSnap.data(), isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      console.log(error.message);
      return set({ user: null, isLoading: false });
    }
  },
}));
