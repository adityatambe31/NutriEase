import { SessionProvider } from "next-auth/react";
import {
  AuthButtonClient,
  MobileAuthButtonClient,
} from "@/components/layout/auth-button.client";
import { BASE_PATH, auth } from "@/auth/auth-config";

interface MobileProps {
  closeMobileMenu: () => void;
}

export async function AuthButtonServer() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}

export async function MobileAuthButtonServer({ closeMobileMenu }: MobileProps) {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <MobileAuthButtonClient closeMobileMenu={closeMobileMenu} />
    </SessionProvider>
  );
}
