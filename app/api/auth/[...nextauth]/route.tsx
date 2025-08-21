import { db } from "@/app/_lib/prisma"
import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters"

// Extend the Session type to include 'id'
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
