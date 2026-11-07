"use server";

import { auth } from "@/auth/auth-config";

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session) {
    return true;
  }
  return false;
};
