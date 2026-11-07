"use client";
import Link from "next/link";
import { BASE_PATH } from "@/auth/auth-config";
import { RxCheckCircled } from "react-icons/rx";
import { motion } from "framer-motion";

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <RxCheckCircled className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Authentication Successful
          </h1>
          <p className="text-slate-600">
            Success! Please check your email inbox for sign in link.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="text-slate-600 mb-4">
            Didn&apos;t receive an email? To go back to the sign-in page and try
            again:
          </p>
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
