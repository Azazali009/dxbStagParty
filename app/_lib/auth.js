import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createOrganizer, getOrganizer } from "./organizerApi";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //this convert auth.user to boolean value if user exist it return true otherwise false
    },
    async signIn({ user, account, profile }) {
      try {
        const existingOrganzier = await getOrganizer(user.email);

        if (!existingOrganzier)
          await createOrganizer({
            email: user.email,
            fullName: user.name,
            image: user.image,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const organizer = await getOrganizer(session.user.email);
      session.user.organizerId = organizer.id;
      const adminEmails =
        process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
      session.user.role = adminEmails.includes(session.user.email)
        ? "admin"
        : "user";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
