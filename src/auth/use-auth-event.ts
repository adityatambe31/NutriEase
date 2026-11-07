"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useAuthEvent() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      document.dispatchEvent(
        new CustomEvent("auth-login", {
          detail: { user: session.user },
        })
      );
    } else if (status === "unauthenticated") {
      document.dispatchEvent(new CustomEvent("auth-logout"));
    }
  }, [session, status]);

  return { session, status };
}
