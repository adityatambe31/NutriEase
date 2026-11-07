'use client';

import { signOut } from '@/auth/helpers';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export default function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const completeSignOut = async () => {
      try {
        await signOut();
        document.cookie.split(';').forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });
        localStorage.clear();
        sessionStorage.clear();

        timeoutId = setTimeout(() => {
          setIsSigningOut(false);
          window.location.href = '/';
        }, 2000);
      } catch (error) {
        console.error('Error during sign out:', error);
        timeoutId = setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    };

    completeSignOut();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            className="bg-red-100 p-3 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <RiLogoutBoxRLine className="text-red-500 text-4xl" />
          </motion.div>

          <motion.h1
            className="text-2xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {isSigningOut ? 'Signing Out...' : 'Signed Out Successfully'}
          </motion.h1>

          {isSigningOut ? (
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Please wait while we securely log you out
            </motion.p>
          ) : (
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Redirecting you to the homepage...
            </motion.p>
          )}
        </div>

        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-8 w-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
