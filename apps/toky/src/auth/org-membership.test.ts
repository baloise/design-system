import { describe, expect, it } from 'vitest'
import { ORG_MEMBERSHIP_RECHECK_INTERVAL_MS, shouldRecheckOrgMembership } from './org-membership'

describe('shouldRecheckOrgMembership', () => {
  it('recheck when there is no prior check timestamp', () => {
    expect(shouldRecheckOrgMembership(undefined)).toBe(true)
  })

  it('does not recheck when the interval has not elapsed', () => {
    const now = 1_000_000
    expect(shouldRecheckOrgMembership(now - ORG_MEMBERSHIP_RECHECK_INTERVAL_MS / 2, now)).toBe(false)
  })

  it('rechecks once the interval has elapsed', () => {
    const now = 1_000_000
    expect(shouldRecheckOrgMembership(now - ORG_MEMBERSHIP_RECHECK_INTERVAL_MS, now)).toBe(true)
  })

  it('rechecks once the interval has been exceeded', () => {
    const now = 1_000_000
    expect(shouldRecheckOrgMembership(now - ORG_MEMBERSHIP_RECHECK_INTERVAL_MS - 1, now)).toBe(true)
  })
})
