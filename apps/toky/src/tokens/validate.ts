import { pathFor } from './edit'
import type { WorkingToken } from './edit'
import { KEY_BY_LAYER } from './flatten'
import { toSlashPath } from './format'
import { invalidSegments, reservedSegments } from './path'

export interface ValidationError {
  tokenKey: string
  message: string
  // 'warning' issues are worth surfacing but never block staging/submitting —
  // unlike 'error', which the caller treats as blocking.
  severity: 'error' | 'warning'
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

  const figmaIdCounts = new Map<string, number>()
  for (const { token } of working) {
    if (!token.figmaId) continue
    figmaIdCounts.set(token.figmaId, (figmaIdCounts.get(token.figmaId) ?? 0) + 1)
  }

  for (const { id, token } of working) {
    const path = pathFor(token.layer, token.name).join('.')

    if (token.name.trim() === '') {
      errors.push({ tokenKey: id, message: 'Name cannot be empty.', severity: 'error' })
    } else if (invalidSegments(token.name).length > 0) {
      errors.push({
        tokenKey: id,
        message: `"${invalidSegments(token.name).join('", "')}" must be PascalCase, e.g. "BackgroundBlue".`,
        severity: 'error',
      })
    } else if (reservedSegments(token.name).length > 0) {
      errors.push({
        tokenKey: id,
        message: `"${reservedSegments(token.name).join('", "')}" is a reserved word and cannot be used in a token path.`,
        severity: 'error',
      })
    } else if ((pathCounts.get(path) ?? 0) > 1) {
      errors.push({
        tokenKey: id,
        message: `Another token already uses "${toSlashPath(token.name)}" in this layer.`,
        severity: 'error',
      })
    }

    // Two tokens can never legitimately share a Figma variableId — Pull
    // indexes tokens by figmaId (see figma-pull.ts), so a collision here
    // means one of the two would silently shadow the other on the next Pull.
    if (token.figmaId && (figmaIdCounts.get(token.figmaId) ?? 0) > 1) {
      errors.push({
        tokenKey: id,
        message: `Another token already uses the same Figma variable (${token.figmaId}).`,
        severity: 'error',
      })
    }

    if (!token.referenceTarget && isEmptyValue(token.rawValue)) {
      errors.push({ tokenKey: id, message: 'Value cannot be empty.', severity: 'error' })
    }

    if (token.referenceTarget && !validPaths.has(token.referenceTarget)) {
      errors.push({
        tokenKey: id,
        message: `"${toSlashPath(token.referenceTarget)}" does not match an existing token.`,
        severity: 'error',
      })
    }

    // Component tokens should alias through the Alias layer rather than
    // reaching straight into Global — not incorrect, just a shortcut that
    // skips the layer meant to carry semantic meaning.
    if (token.layer === 'Component' && token.referenceTarget?.startsWith(`${KEY_BY_LAYER.Global}.`)) {
      errors.push({
        tokenKey: id,
        message: `References "${toSlashPath(token.referenceTarget)}" directly from Global — consider aliasing it instead.`,
        severity: 'warning',
      })
    }
  }

  return errors
}
