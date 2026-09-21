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
 * Resolves one named Variable Collection and a name -> modeId map for the
 * given required mode names, matched by exact name. A file can hold more
 * than one collection (the brand collection and the responsive/breakpoint
 * collection are two independent ones — see findCollectionAndModes/
 * findResponsiveCollectionAndModes below); this resolves whichever one
 * `collectionName` names, ignoring the rest. A missing collection or mode
 * fails loudly rather than auto-creating one: mode/collection
 * auto-creation for an *existing* file isn't implemented (bootstrap.mjs
 * only handles the one-time no-collections-at-all case), so a human needs
 * to create it in Figma first, same as adding a brand does today.
 */
function findNamedCollectionAndModes(meta, collectionName, requiredModeNames) {
  const collection = Object.values(meta.variableCollections).find(c => c.name === collectionName)
  if (!collection) {
    throw new Error(
      `No Figma variable collection named "${collectionName}" found in this file — ` +
        `run bootstrap (Pull with no existing collections) or create it in Figma first.`,
    )
  }

  const modeIdByName = Object.fromEntries(collection.modes.map(mode => [mode.name, mode.modeId]))

  const modeIds = {}
  for (const name of requiredModeNames) {
    const modeId = modeIdByName[name]
    if (!modeId) {
      throw new Error(
        `No Figma mode named "${name}" found in collection "${collection.name}" — create it in Figma before running Pull.`,
      )
    }
    modeIds[name] = modeId
  }

  return { collectionId: collection.id, modeIds }
}

/**
 * Resolves the brand collection and a brand-name -> modeId map — one Figma
 * mode per brand (docs/adr/0012-brand-modes-not-collections.md).
 */
export function findCollectionAndModes(meta, brandNames, collectionName = 'Design Tokens') {
  const { collectionId, modeIds } = findNamedCollectionAndModes(meta, collectionName, ['Base', ...brandNames])
  return { collectionId, modeIdByBrand: modeIds }
}

/**
 * Resolves the responsive/breakpoint collection (docs — MVP scope: Device-layer
 * Text.Size/Space/Container.Space Device variables, see lib/figma-value.mjs's
 * DEVICE_ELIGIBLE_PATH_PREFIXES) and a breakpoint-name -> modeId map.
 */
export function findResponsiveCollectionAndModes(meta, collectionName = 'Design Responsive Tokens') {
  const { collectionId, modeIds } = findNamedCollectionAndModes(meta, collectionName, ['Mobile', 'Tablet', 'Desktop'])
  return { collectionId, modeIdByBreakpoint: modeIds }
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
