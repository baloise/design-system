// How long a JWT's cached org-membership result is trusted before the next
// token refresh re-checks it against GitHub, per docs/adr/0003 — bounds how
// long a since-removed org member keeps access without calling GitHub on
// every request.
export const ORG_MEMBERSHIP_RECHECK_INTERVAL_MS = 60 * 60 * 1000

export function shouldRecheckOrgMembership(lastCheckedAt: number | undefined, now: number = Date.now()): boolean {
  if (lastCheckedAt === undefined) return true
  return now - lastCheckedAt >= ORG_MEMBERSHIP_RECHECK_INTERVAL_MS
}
