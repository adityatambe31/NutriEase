"use client";

import Link from "next/link";
import { BASE_PATH } from "@/auth/auth-config";
import { RxExclamationTriangle } from "react-icons/rx";
import { motion } from "framer-motion";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <RxExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Authentication Error
          </h1>
          <p className="text-slate-600">
            Oops, something went wrong during the authentication process.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="text-slate-600 mb-4">To go back to the sign in page:</p>
          <Link
            href={`${BASE_PATH}/signin`}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Return to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
