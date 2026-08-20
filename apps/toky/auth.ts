import NextAuth from 'next-auth'
import type { DefaultSession } from 'next-auth'
import type {} from 'next-auth/jwt'
import GitHub from 'next-auth/providers/github'
import { shouldRecheckOrgMembership } from './src/auth/org-membership'
import { isOrgMember } from './src/tokens/github-org'

declare module 'next-auth' {
  interface Session {
    user: {
      login: string
      isOrgMember: boolean
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    login?: string
    isOrgMember?: boolean
    orgCheckedAt?: number
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: 'jwt' },
  callbacks: {
    // Read-only identity from the GitHub provider (default `read:user` scope
    // — never used for writes or as the org-check credential, see
    // docs/adr/0003). Org membership is re-verified whenever this callback
    // fires past ORG_MEMBERSHIP_RECHECK_INTERVAL_MS, which bounds staleness
    // without an extra GitHub call on every request.
    async jwt({ token, profile }) {
      if (profile) {
        token.login = (profile as { login?: string }).login
        token.picture = (profile as { avatar_url?: string }).avatar_url
      }

      if (token.login && shouldRecheckOrgMembership(token.orgCheckedAt)) {
        token.isOrgMember = await isOrgMember(token.login)
        token.orgCheckedAt = Date.now()
      }

      return token
    },
    async session({ session, token }) {
      if (token.login) session.user.login = token.login
      session.user.isOrgMember = token.isOrgMember ?? false
      return session
    },
  },
})
