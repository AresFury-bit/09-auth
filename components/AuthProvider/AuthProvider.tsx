"use client";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useEffect } from "react";
import { useUserStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const clearIsAuthenticated = useUserStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fechUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fechUser();
  }, [setUser, clearIsAuthenticated]);
  return children;
}
