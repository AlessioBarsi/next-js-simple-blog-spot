export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/admin', '/profile', '/roles', '/users'],
}