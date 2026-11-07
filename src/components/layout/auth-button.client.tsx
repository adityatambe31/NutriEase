'use client';

import { UserAvatar } from '@/auth/components/user-avatar';
import { signOut } from '@/auth/helpers';
import { UserDropdown } from '@/components/layout/user-dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

export function AuthButtonClient() {
  const { data: session, status, update } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await nextAuthSignOut({ redirect: false });
      await signOut();
      await update();
      router.refresh();
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const currentPath = window.location.pathname;

      await nextAuthSignIn(undefined, {
        redirect: true,
        callbackUrl: currentPath || '/planner',
      });
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggingIn(false);
    }
  };

  if (status === 'loading' || isLoggingOut || isLoggingIn) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-24 bg-blue-500/30 rounded-md animate-pulse"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative">
          <UserDropdown user={session.user} onSignOut={handleLogout} />
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      <FaRegUserCircle className="text-lg" />
      <span>Login</span>
    </Button>
  );
}

export function MobileAuthButtonClient({
  closeMobileMenu,
}: {
  closeMobileMenu: () => void;
}) {
  const { data: session, status, update } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      closeMobileMenu();
      await nextAuthSignOut({
        redirect: true,
        callbackUrl: '/auth/signout',
      });
      await signOut();
      await update();
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    closeMobileMenu();
    try {
      const currentPath = window.location.pathname;

      await nextAuthSignIn(undefined, {
        redirect: true,
        callbackUrl: currentPath || '/planner',
      });
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggingIn(false);
    }
  };

  if (status === 'loading' || isLoggingOut || isLoggingIn) {
    return (
      <div className="flex flex-col items-center w-full p-2">
        <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mb-3"></div>
        <div className="h-5 w-32 bg-gray-200 animate-pulse mb-2 rounded"></div>
        <div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex flex-col items-center space-y-3 py-2">
          <div className="flex items-center gap-3 w-full p-3">
            <UserAvatar
              src={session.user.image}
              alt={session.user.name || 'User'}
              size={48}
              className="flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-medium text-base text-gray-900">
                {session.user.name || 'User'}
              </h3>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <div className="w-full space-y-2 mt-2 p-4">
            <Button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 w-full">
      <Button
        onClick={handleLogin}
        className="flex items-center justify-center gap-2 w-full max-w-xs bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-md transition-colors"
      >
        <FaRegUserCircle className="text-lg" />
        <span>Login</span>
      </Button>
    </div>
  );
}
