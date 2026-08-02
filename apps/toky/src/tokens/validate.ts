import { pathFor } from './edit'
import type { WorkingToken } from './edit'

export interface ValidationError {
  tokenKey: string
  message: string
}

function isEmptyValue(value: unknown): boolean {
  return value === '' || value === undefined || value === null
}

export function validateWorkingTokens(working: WorkingToken[]): ValidationError[] {
  const errors: ValidationError[] = []

  const pathCounts = new Map<string, number>()
  for (const { token } of working) {
    const key = pathFor(token.layer, token.name).join('.')
    pathCounts.set(key, (pathCounts.get(key) ?? 0) + 1)
  }

  const validPaths = new Set(pathCounts.keys())

  for (const { id, token } of working) {
    const path = pathFor(token.layer, token.name).join('.')

    if (token.name.trim() === '') {
      errors.push({ tokenKey: id, message: 'Name cannot be empty.' })
    } else if ((pathCounts.get(path) ?? 0) > 1) {
      errors.push({ tokenKey: id, message: `Another token already uses "${token.name}" in this layer.` })
    }

    if (!token.referenceTarget && isEmptyValue(token.rawValue)) {
      errors.push({ tokenKey: id, message: 'Value cannot be empty.' })
    }

    if (token.referenceTarget && !validPaths.has(token.referenceTarget)) {
      errors.push({ tokenKey: id, message: `"${token.referenceTarget}" does not match an existing token.` })
    }
  }

  return errors
}
