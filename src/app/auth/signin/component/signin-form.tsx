'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { VscAzure, VscGithub } from 'react-icons/vsc';

const SIGNIN_ERROR_URL = '/auth/auth-error';

export function SigninFormComponent({
  error,
  credentialsAction,
  providerMap,
  callbackUrl,
}: {
  error?: string;
  credentialsAction: (formData: FormData) => Promise<void>;
  providerMap: { id: string; name: string }[];
  callbackUrl?: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const getProviderIcon = (id: string) => {
    switch (id) {
      case 'google':
        return <FcGoogle className="h-4 w-4" />;
      case 'github':
        return <VscGithub className="h-4 w-4" />;
      case 'azure-ad':
      case 'microsoft-entra-id':
        return <VscAzure className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleOAuthSignIn = async (providerId: string) => {
    try {
      setIsLoading({ ...isLoading, [providerId]: true });

      // Client-side OAuth sign-in with proper callback URL handling
      await nextAuthSignIn(providerId, {
        callbackUrl: callbackUrl || '/planner',
        redirect: true,
      });

      // Note: The above will redirect, so the code below won't execute
      // It's only here as a fallback
    } catch (error) {
      setIsLoading({ ...isLoading, [providerId]: false });
      console.error('OAuth sign in failed:', error);
      router.push(`${SIGNIN_ERROR_URL}?error=OAuthSignin`);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-white to-green-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">NutriEase</h1>
          <p className="text-green-500">Smart Bites, Better Lives</p>
        </div>
        <Card className="border border-slate-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              Sign in
            </CardTitle>
            <CardDescription className="text-center text-slate-500">
              Enter your credentials to access your account
            </CardDescription>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error === 'CredentialsSignin'
                  ? 'Invalid email or password'
                  : `Authentication error: ${error}`}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Credentials Form */}
            <form className="space-y-4" action={credentialsAction}>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-10 bg-white border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-green-600 hover:text-green-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="h-10 bg-white border-slate-200"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 h-10 text-white"
              >
                Sign in
              </Button>
            </form>

            <div className="relative my-6">
              <Separator className="bg-slate-200" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>

            {/* Microsoft SSO */}
            {providerMap.some(
              (p) => p.id === 'microsoft-entra-id' || p.id === 'azure-ad',
            ) && (
              <div className="grid gap-3">
                {providerMap
                  .filter(
                    (p) => p.id === 'microsoft-entra-id' || p.id === 'azure-ad',
                  )
                  .map((provider) => (
                    <Button
                      key={provider.id}
                      onClick={() => handleOAuthSignIn(provider.id)}
                      disabled={isLoading[provider.id]}
                      variant="outline"
                      className="w-full h-10 flex items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      {isLoading[provider.id] ? (
                        <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <VscAzure className="h-4 w-4 text-blue-500" />
                      )}
                      <span>
                        Single Sign-On{' '}
                        {isLoading[provider.id]
                          ? 'Processing...'
                          : '(Dev Access Only)'}
                      </span>
                    </Button>
                  ))}
              </div>
            )}

            {/* Other OAuth Providers */}
            <div className="flex gap-3">
              {providerMap
                .filter(
                  (p) => p.id !== 'microsoft-entra-id' && p.id !== 'azure-ad',
                )
                .map((provider) => (
                  <Button
                    key={provider.id}
                    onClick={() => handleOAuthSignIn(provider.id)}
                    disabled={isLoading[provider.id]}
                    variant="outline"
                    className="flex-1 h-10 flex items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    {isLoading[provider.id] ? (
                      <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      getProviderIcon(provider.id)
                    )}
                    <span>{isLoading[provider.id] ? '' : provider.name}</span>
                  </Button>
                ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                href="#"
                className="font-medium text-green-600 hover:text-green-500 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
