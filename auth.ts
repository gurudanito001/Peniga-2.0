import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from "zod";
import { sql } from '@vercel/postgres';
import type {User} from "@prisma/client"
import bcrypt from 'bcrypt';
import { prisma } from './app/lib/prisma';

async function getUser(email: string): Promise<User | null> {
  try {
    /* const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0]; */
    let user = await prisma.user.findFirst({
      where: {email}
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          if(user?.password){
            const passwordsMatch = await bcrypt.compare(password, user?.password);
            console.log(passwordsMatch)
            if (passwordsMatch) return user;
          }
        }
        return null;
      },
    }),
  ],
});