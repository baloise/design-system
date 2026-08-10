import { NextResponse } from 'next/server'
import { auth } from './auth'
import { isApiPath, isAuthDisabledLocally, isBlockedNonProductionDeploy, isPublicPath } from './src/auth/route-access'

// Single gate for every UI and API route (see docs/adr/0003) — no route can
// accidentally ship unprotected by omitting its own per-route check. Local-only
// escape hatch: TOKY_DISABLE_AUTH=true skips this entirely so `pnpm toky` can be
// smoke-tested without a GitHub sign-in round trip. isAuthDisabledLocally requires
// VERCEL to be unset, so this can never take effect on a real deployment.
export default isAuthDisabledLocally({ vercel: process.env.VERCEL, disableAuth: process.env.TOKY_DISABLE_AUTH })
  ? () => NextResponse.next()
  : auth(request => {
      const { pathname } = request.nextUrl

      if (isBlockedNonProductionDeploy({ vercel: process.env.VERCEL, vercelEnv: process.env.VERCEL_ENV })) {
        return NextResponse.json({ error: 'Toky is unavailable outside the production deployment.' }, { status: 403 })
      }

      if (isPublicPath(pathname)) return NextResponse.next()

      const user = request.auth?.user
      const api = isApiPath(pathname)

      if (!user) {
        if (api) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const signInUrl = new URL('/api/auth/signin', request.nextUrl.origin)
        signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
        return NextResponse.redirect(signInUrl)
      }

      if (!user.isOrgMember) {
        if (api) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        return NextResponse.redirect(new URL('/denied', request.nextUrl.origin))
      }

      return NextResponse.next()
    })

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.svg).*)'],
}
