import { User } from "@/types/user";
import { persist } from "zustand/middleware";
import { create } from "zustand";


type AuthStore = {
    user: User|null;
    isAuthenticated: boolean;
    setUser: (user:User) => void;
    clearIsAuthenticated: () => void;
}


export const useUserStore = create<AuthStore>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: User) => (set(() => ({ user: user, isAuthenticated:true }))),
    clearIsAuthenticated: () => (set(() => ({ user: null, isAuthenticated:false})))
}),
    {
        name: "user",
        partialize: (state)=>({user: state.user})
    
}
))
