// types/next-auth.d.ts or src/next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      name?: string | null
      email?: string | null
      picture?: string | null
      createdAt?: string
      userHasRoles?: {
        id: number
        userId: number
        roleId: number
        role: {
          id: number
          name: string
        }
      }[]
    }
  }

  interface User {
    id: number
    name?: string | null
    email?: string | null
    picture?: string | null
    createdAt?: string
    userHasRoles?: {
      id: number
      userId: number
      roleId: number
      role: {
        id: number
        name: string
      }
    }[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    picture?: string | null
    createdAt: string
    userHasRoles?: {
      id: number
      userId: number
      roleId: number
      role: {
        id: number
        name: string
      }
    }[]
  }
}
