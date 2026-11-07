"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/auth/helpers";
import Cookies from "js-cookie";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function useAuthentication() {
  const { data: session, status } = useSession();

  const user: User | null = session?.user || null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (session?.user) {
        localStorage.setItem("user", JSON.stringify(session.user));
      } else if (status === "unauthenticated") {
        localStorage.removeItem("user");
      }
    }
  }, [session, status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (session?.user) {
        Cookies.set("user", JSON.stringify(session.user), { expires: 7 });
      } else if (status === "unauthenticated") {
        Cookies.remove("user");
      }
    }
  }, [session, status]);

  const login = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return {
    user,
    login,
    logout,
    isLoading: status === "loading",
    isAuthenticated: !!user,
  };
}
