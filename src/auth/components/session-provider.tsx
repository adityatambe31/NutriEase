"use client";

import { SessionProvider } from "next-auth/react";
import { BASE_PATH } from "@/auth/auth-config";
import { ReactNode } from "react";

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider basePath={BASE_PATH}>{children}</SessionProvider>;
}
