// @ts-nocheck
import { fetchUserByEmail } from '@/app/actions/user'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await fetchUserByEmail(credentials.email);

        if (!user) {
          return null
        }

        if (!credentials.password) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          picture: user.picture,
          createdAt: user.createdAt,
          userHasRoles: user.userHasRoles,
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      //console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          picture: token.picture,
          createdAt: token.createdAt,
          userHasRoles: token.userHasRoles,
        }
      }
    },
    jwt: ({ token, user }) => {
      //console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          name: u.name,
          email: u.email,
          picture: u.picture,
          createdAt: u.createdAt,
          userHasRoles: u.userHasRoles,
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
