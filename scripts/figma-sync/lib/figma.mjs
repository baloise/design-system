/**
 * Figma Variables REST API client. Read-only for Phase 1
 * (docs/plans/figma-sync-action-plan.md §7) — the write path
 * (POST /v1/files/:key/variables) lands in Phase 2.
 */
const FIGMA_API_ROOT = 'https://api.figma.com/v1'

/**
 * @param {string} fileKey
 * @param {string} token
 * @returns {Promise<{
 *   variables: Record<string, { id: string, name: string, variableCollectionId: string, resolvedType: string, valuesByMode: Record<string, unknown>, scopes: string[] }>,
 *   variableCollections: Record<string, { id: string, name: string, modes: { modeId: string, name: string }[], defaultModeId: string }>,
 * }>}
 */
export async function getLocalVariables(fileKey, token) {
  const response = await fetch(`${FIGMA_API_ROOT}/files/${fileKey}/variables/local`, {
    headers: { 'X-Figma-Token': token },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `Failed to fetch local variables for file ${fileKey}: ${response.status} ${response.statusText} — ${body}`,
    )
  }

  const json = await response.json()
  return json.meta
}

/**
 * @param {string} fileKey
 * @param {string} token
 * @param {{ variables?: object[], variableModeValues?: object[] }} payload
 * @returns {Promise<{ tempIdToRealId: Record<string, string> }>}
 */
export async function postVariables(fileKey, token, payload) {
  const response = await fetch(`${FIGMA_API_ROOT}/files/${fileKey}/variables`, {
    method: 'POST',
    headers: { 'X-Figma-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `Failed to write variables for file ${fileKey}: ${response.status} ${response.statusText} — ${body}`,
    )
  }

  const json = await response.json()
  return json.meta
}

/**
 * Resolves the single Variable Collection this sync writes to, and a
 * brand-name -> modeId map — one Figma mode per brand, matched by exact
 * name (docs/adr/0012-brand-modes-not-collections.md). A brand with no
 * matching mode fails loudly: mode auto-creation isn't implemented yet
 * (docs/plans/figma-sync-action-plan.md §8), so a missing mode needs a
 * human to create it in Figma first, same as adding a brand does today.
 */
export function findCollectionAndModes(meta, brandNames) {
  const collections = Object.values(meta.variableCollections)
  if (collections.length !== 1) {
    throw new Error(
      `Expected exactly one Figma variable collection in this file, found ${collections.length} — ` +
        `multi-collection files aren't supported yet.`,
    )
  }

  const collection = collections[0]
  const modeIdByName = Object.fromEntries(collection.modes.map(mode => [mode.name, mode.modeId]))

  const modeIdByBrand = {}
  for (const brand of ['Base', ...brandNames]) {
    const modeId = modeIdByName[brand]
    if (!modeId) {
      throw new Error(
        `No Figma mode named "${brand}" found in collection "${collection.name}" — create it in Figma before running Pull.`,
      )
    }
    modeIdByBrand[brand] = modeId
  }

  return { collectionId: collection.id, modeIdByBrand }
}

/**
 * Figma variable name -> id, scoped to one collection — powers the
 * path/name fallback match in lib/write.mjs's assignVariableIds
 * (docs/adr/0001-figma-variable-identity-key.md). Scoped to the
 * collection, not global, since two different collections could
 * legitimately reuse the same variable name.
 */
export function buildNameIndex(meta, collectionId) {
  const index = new Map()
  for (const variable of Object.values(meta.variables)) {
    if (variable.variableCollectionId === collectionId) {
      index.set(variable.name, variable.id)
    }
  }
  return index
}
