import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [Google],
  callbacks: {
    // eslint-disable-next-line no-shadow
    authorized: async ({ auth }) => (
      !!auth
    )
  },
  pages: {
    signIn: '/signin'
  }
});
