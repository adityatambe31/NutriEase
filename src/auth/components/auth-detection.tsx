"use client";
import { useAuthEvent } from "@/auth/use-auth-event";
import { ReactNode } from "react";

export function AuthListener({ children }: { children: ReactNode }) {
  useAuthEvent();
  return <>{children}</>;
}
