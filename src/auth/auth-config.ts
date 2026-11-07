import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

export const BASE_PATH = '/api/auth';

const authSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

const googleClientId = process.env.NEXTAUTH_GOOGLE_ID || process.env.AUTH_GOOGLE_ID;
const googleClientSecret =
  process.env.NEXTAUTH_GOOGLE_SECRET || process.env.AUTH_GOOGLE_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID;
const githubClientSecret =
  process.env.GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET;

const azureClientId = process.env.AUTH_MICROSOFT_ENTRA_ID_ID;
const azureClientSecret = process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET;
const azureIssuer = process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER;

const providers: Provider[] = [];

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  );
}

if (azureClientId && azureClientSecret && azureIssuer) {
  providers.push(
    MicrosoftEntraID({
      clientId: azureClientId,
      clientSecret: azureClientSecret,
      issuer: azureIssuer,
    }),
  );
}

if (githubClientId && githubClientSecret) {
  providers.push(
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  );
}

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: MongoDBAdapter(client),
  providers,
  basePath: BASE_PATH,
  secret: authSecret,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/auth-error',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account }) {
  if (account?.provider && account.providerAccountId) {
    token.appUserId = `${account.provider}:${account.providerAccountId}`;
  }
  return token;
},

async session({ session, token }) {
  if (session.user && typeof token.appUserId === 'string') {
    session.user.id = token.appUserId;
  }
  return session;
},
  },
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
});
