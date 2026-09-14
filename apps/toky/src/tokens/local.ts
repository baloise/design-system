import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { TOKENS_DIR } from './github'

// Opt-in local-dev escape hatch, gated the same way everywhere it's checked
// (see isAuthDisabledLocally in src/auth/route-access.ts): requires `VERCEL`
// to be unset, so this can never take effect on any real deployment
// (including a preview build run with production env vars), even if
// TOKY_LOCAL_TOKENS is mistakenly set there.
export function isLocalTokensModeEnabled(): boolean {
  return !process.env.VERCEL && process.env.TOKY_LOCAL_TOKENS === 'true'
}

// apps/toky is the Next.js server's cwd — TOKENS_DIR ('packages/tokens/tokens') is relative to
// the monorepo root, two levels up.
export function localTokensDir(): string {
  return path.resolve(process.cwd(), '..', '..', TOKENS_DIR)
}

export function localBaseTokensPath(): string {
  return path.join(localTokensDir(), 'Base.tokens.json')
}

export async function readLocalBaseTokensDocument(): Promise<Record<string, unknown>> {
  const raw = await readFile(localBaseTokensPath(), 'utf-8')
  return JSON.parse(raw) as Record<string, unknown>
}

export async function writeLocalBaseTokensDocument(doc: Record<string, unknown>): Promise<void> {
  await writeFile(localBaseTokensPath(), `${JSON.stringify(doc, null, 2)}\n`, 'utf-8')
}

export function localBrandTokensPath(name: string): string {
  return path.join(localTokensDir(), `${name}.tokens.json`)
}

// Every `*.tokens.json` sibling of Base.tokens.json, same rule page.tsx's
// loadTokensFromLocalDisk uses to build the brand list shown in the editor —
// kept here too so route.ts can check a brandDiffs name against what
// actually exists on disk without duplicating the filter.
export async function listLocalTokenBrandFiles(): Promise<string[]> {
  const entries = await readdir(localTokensDir())
  return entries
    .filter(name => name.endsWith('.tokens.json') && name !== 'Base.tokens.json')
    .map(name => name.slice(0, -'.tokens.json'.length))
    .sort((a, b) => a.localeCompare(b))
}

export async function readLocalBrandTokensDocument(name: string): Promise<Record<string, unknown>> {
  const raw = await readFile(localBrandTokensPath(name), 'utf-8')
  return JSON.parse(raw) as Record<string, unknown>
}

export async function writeLocalBrandTokensDocument(name: string, doc: Record<string, unknown>): Promise<void> {
  await writeFile(localBrandTokensPath(name), `${JSON.stringify(doc, null, 2)}\n`, 'utf-8')
}
