// Routes proxy.ts must let through unauthenticated — NextAuth's own
// sign-in/callback/session machinery, and the denied page itself (a signed-in
// non-member must be able to actually see it, not get redirected in a loop).
const PUBLIC_PATHS = ['/api/auth', '/denied']

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`))
}

export function isApiPath(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

// Toky is blocked outright on any non-production Vercel deployment (see
// docs/adr/0003) — the GitHub OAuth App's callback URL is scoped to the
// production domain only, so preview deployments can't complete sign-in, and
// leaving them open would otherwise be an unauthenticated write path to the
// real repo via the bot PAT. `VERCEL` is only set when running on Vercel at
// all, so local dev (where neither var is set) is unaffected.
export function isBlockedNonProductionDeploy(env: { vercel?: string; vercelEnv?: string }): boolean {
  return !!env.vercel && env.vercelEnv !== 'production'
}

// Local-only escape hatch for fast manual testing (`pnpm toky` +
// TOKY_DISABLE_AUTH=true skips GitHub sign-in entirely). Requires `vercel` to
// be unset so this can never take effect on any real deployment, including
// preview builds run with production env vars.
export function isAuthDisabledLocally(env: { vercel?: string; disableAuth?: string }): boolean {
  return !env.vercel && env.disableAuth === 'true'
}
