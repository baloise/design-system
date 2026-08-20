import { describe, expect, it } from 'vitest'
import { isApiPath, isBlockedNonProductionDeploy, isPublicPath } from './route-access'

describe('isPublicPath', () => {
  it('treats NextAuth routes as public', () => {
    expect(isPublicPath('/api/auth/signin')).toBe(true)
    expect(isPublicPath('/api/auth/callback/github')).toBe(true)
    expect(isPublicPath('/api/auth')).toBe(true)
  })

  it('treats the denied page as public', () => {
    expect(isPublicPath('/denied')).toBe(true)
  })

  it('treats everything else as protected', () => {
    expect(isPublicPath('/')).toBe(false)
    expect(isPublicPath('/api/propose-change')).toBe(false)
    expect(isPublicPath('/deniedxyz')).toBe(false)
  })
})

describe('isApiPath', () => {
  it('flags /api/* routes', () => {
    expect(isApiPath('/api/propose-change')).toBe(true)
    expect(isApiPath('/')).toBe(false)
  })
})

describe('isBlockedNonProductionDeploy', () => {
  it('does not block local dev, where neither var is set', () => {
    expect(isBlockedNonProductionDeploy({})).toBe(false)
  })

  it('does not block a production Vercel deployment', () => {
    expect(isBlockedNonProductionDeploy({ vercel: '1', vercelEnv: 'production' })).toBe(false)
  })

  it('blocks a preview Vercel deployment', () => {
    expect(isBlockedNonProductionDeploy({ vercel: '1', vercelEnv: 'preview' })).toBe(true)
  })

  it('blocks a development Vercel deployment', () => {
    expect(isBlockedNonProductionDeploy({ vercel: '1', vercelEnv: 'development' })).toBe(true)
  })
})
