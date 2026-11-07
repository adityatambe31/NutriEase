// For Test ONLY
// Contact: team404@dcglobal.co for more info

import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth/auth-config";

import AuthButtonClient from "./auth-button.client";

export default async function AuthButton() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
