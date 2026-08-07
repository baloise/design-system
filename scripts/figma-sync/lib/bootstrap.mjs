/**
 * First-ever-sync bootstrap: a target Figma file with zero Variable
 * Collections needs one created, with one mode per brand, before Pull's
 * normal create/update path (lib/write.mjs) has anywhere to write to.
 * findCollectionAndModes (lib/figma.mjs) deliberately stays strict — "no
 * mode named X" fails loudly for an *existing* collection missing a brand
 * — this module handles the different, one-time case of no collection at
 * all.
 */

/**
 * Figma auto-creates a default mode when a collection is created; rather
 * than create a redundant extra mode for Base, this renames that
 * auto-created default mode to "Base" via the same temp id passed as
 * `initialModeId`, referenced again by a variableModes UPDATE action in
 * the same request.
 */
export function buildBootstrapPayload(brandNames, collectionName = 'Design Tokens') {
  const collectionTempId = 'temp-collection-bootstrap'
  const baseModeTempId = 'temp-mode-Base'

  const variableCollections = [
    { action: 'CREATE', id: collectionTempId, name: collectionName, initialModeId: baseModeTempId },
  ]

  const variableModes = [
    // variableCollectionId is required on every entry here, even UPDATE —
    // confirmed against Figma's real API, which 400s otherwise
    // ("Required value missing at variableModes.0.variableCollectionId").
    { action: 'UPDATE', id: baseModeTempId, name: 'Base', variableCollectionId: collectionTempId },
    ...brandNames.map(brand => ({
      action: 'CREATE',
      id: `temp-mode-${brand}`,
      name: brand,
      variableCollectionId: collectionTempId,
    })),
  ]

  return { variableCollections, variableModes, collectionTempId, baseModeTempId, brandNames }
}

export function resolveBootstrapIds(bootstrap, tempIdToRealId) {
  const collectionId = tempIdToRealId[bootstrap.collectionTempId]
  const modeIdByBrand = { Base: tempIdToRealId[bootstrap.baseModeTempId] }

  for (const brand of bootstrap.brandNames) {
    modeIdByBrand[brand] = tempIdToRealId[`temp-mode-${brand}`]
  }

  if (!collectionId || Object.values(modeIdByBrand).some(id => !id)) {
    throw new Error(
      `Bootstrap response didn't resolve every temp id — got tempIdToRealId: ${JSON.stringify(tempIdToRealId)}. ` +
        `Figma's API may not support pre-declaring initialModeId the way this assumes; check the raw response.`,
    )
  }

  return { collectionId, modeIdByBrand }
}
