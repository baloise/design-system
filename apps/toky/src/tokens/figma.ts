// Server-side Figma REST client for Pull (from Figma) — see
// docs/adr/0002-pull-from-figma-button.md. Hand-rolled the same way
// scripts/figma-sync/lib/figma.mjs is: no SDK, a single endpoint, no
// pagination. Deliberately not imported from there — that file is Node-only
// (outside apps/toky's module boundary) and this repo's existing pattern is
// to reimplement the small equivalent per app rather than cross-import
// (see github.ts vs. scripts/figma-sync/lib/github.mjs).

export interface FigmaVariable {
  id: string
  name: string
  variableCollectionId: string
  resolvedType: string
  valuesByMode: Record<string, unknown>
  scopes: string[]
  description: string
}

export interface FigmaVariableCollection {
  id: string
  name: string
  modes: { modeId: string; name: string }[]
  defaultModeId: string
  // true for a collection published by a linked library rather than owned by this file — e.g. a
  // shared "Space"/"Typography" collection enabled as a library. findCollectionAndModes in
  // figma-pull.ts must ignore these; the design tokens sync only ever owns one local collection.
  remote?: boolean
}

export interface FigmaVariablesMeta {
  variables: Record<string, FigmaVariable>
  variableCollections: Record<string, FigmaVariableCollection>
}

export function requireFigmaApiToken(): string {
  const token = process.env.FIGMA_API_TOKEN
  if (!token) {
    throw new Error('FIGMA_API_TOKEN is not set — a Figma personal access token is required to pull from Figma.')
  }
  return token
}

export function requireFigmaFileKey(): string {
  const fileKey = process.env.FIGMA_FILE_KEY
  if (!fileKey) {
    throw new Error('FIGMA_FILE_KEY is not set — the Figma file key is required to pull from Figma.')
  }
  return fileKey
}

export async function getFigmaVariables(fileKey: string, token: string): Promise<FigmaVariablesMeta> {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    // Always fetch live — a pull must never show a stale cached snapshot of
    // Figma's variables (same reasoning as fetchBaseTokensFile's no-store).
    cache: 'no-store',
    headers: {
      'X-Figma-Token': token,
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Failed to fetch Figma variables: ${response.status} ${response.statusText} — ${body}`)
  }

  const json = (await response.json()) as { meta: FigmaVariablesMeta }
  snapFloatVariableNoise(json.meta)
  return json.meta
}

// Figma's REST API round-trips FLOAT variables through 32-bit floats, so a value authored as e.g.
// 1.3 or 0.3 comes back as 1.2999999523162842 or 0.30000001192092896 — real drift, not a value
// anyone entered. Left alone, that noise both gets written into the token file verbatim and (since
// isLiteralValueEqual in figma-map.ts only special-cases color with a tolerance, per ADR-0002)
// trips a false "changed" diff on every single pull. Snapping once here, at the one place every
// FLOAT variable's value enters this app, fixes both — every downstream reader (deriveValue's
// plain number/dimension branches, the shadow/border/typography sub-value readers) sees the clean
// decimal a designer actually authored, without each of those call sites needing its own rounding.
function snapFloatVariableNoise(meta: FigmaVariablesMeta): void {
  for (const variable of Object.values(meta.variables)) {
    if (variable.resolvedType !== 'FLOAT') continue
    for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
      if (typeof value !== 'number' || !Number.isFinite(value) || value === 0) continue
      variable.valuesByMode[modeId] = Number(value.toPrecision(6))
    }
  }
}
