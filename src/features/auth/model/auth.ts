import User from '@/entities/user/model/user';
import connectToDatabase from '@/shared/lib/mongodb';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Enter email and password');
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password ?? '');

        if (!isValidPassword) {
          throw new Error('Incorrect password... Try again');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();

      if (!user?.email) return false;

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
        });

        existingUser = await newUser.save();
      }

      user.id = existingUser._id.toString();

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  // ---- PAGE

  pages: {
    signIn: '/sign-in',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
