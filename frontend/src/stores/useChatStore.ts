// Messages Store
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  users: any[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      const data = Array.isArray(response.data) 
        ? response.data 
        : response.data.users;
      set({ users: data || [] }); 
    } catch (error:any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}))