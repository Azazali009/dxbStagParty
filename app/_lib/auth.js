import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createOrganizer, getOrganizer } from "./organizerApi";
import { supabase } from "./supabase";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        console.log(email, password);
        if (error || !data.user) throw new Error(error);

        return {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email,
          email: data.user.email,
          image: data.user.user_metadata?.avatar_url || null,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //this convert auth.user to boolean value if user exist it return true otherwise false
    },
    async signIn({ user, account, profile }) {
      try {
        // const existingOrganzier = await getOrganizer(user.email);

        // if (!existingOrganzier)
        //   await createOrganizer({
        //     email: user.email,
        //     fullName: user.name,
        //     image: user.image,
        //   });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      // const organizer = await getOrganizer(session.user.email);
      // session.user.organizerId = organizer.id;
      // const adminEmails =
      //   process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
      // session.user.role = adminEmails.includes(session.user.email)
      //   ? "admin"
      //   : "user";
      // return session;
      const { data, error } = await supabase
        .from("users")
        .select("id, role")
        .eq("email", session.user.email) // Match user by ID
        .single();

      if (error) {
        // console.error("Error fetching user profile:", error?.message);
        session.user.role = "organiser"; // default
        return session;
      }

      session.user.role = data.role;
      session.user.userId = data.id;
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
