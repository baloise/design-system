/**
 * First-ever-sync bootstrap: a target Figma file with zero Variable
 * Collections needs one created, with one mode per brand, before Pull's
 * normal create/update path (lib/write.mjs) has anywhere to write to.
 * findCollectionAndModes (lib/figma.mjs) deliberately stays strict — "no
 * mode named X" fails loudly for an *existing* collection missing a brand
 * — this module handles the different, one-time case of no collection at
 * all.
 *
 * Two independent collections get bootstrapped this way: the brand
 * collection (`buildBootstrapPayload`, modes = Base + each brand) and the
 * responsive collection (`buildResponsiveBootstrapPayload`, modes = Mobile/
 * Tablet/Desktop) that holds the Device variables (docs — MVP scope: Device-layer
 * Text.Size/Space/Container.Space only, see lib/figma-value.mjs's
 * DEVICE_ELIGIBLE_PATH_PREFIXES). They're bootstrapped separately because a
 * file may already have one collection but not the other (e.g. the brand
 * collection was created before this feature existed).
 */

/**
 * Figma auto-creates a default mode when a collection is created; rather
 * than create a redundant extra mode, this renames that auto-created
 * default mode to `defaultModeName` via the same temp id passed as
 * `initialModeId`, referenced again by a variableModes UPDATE action in
 * the same request.
 */
function buildCollectionBootstrapPayload(
  collectionName,
  defaultModeName,
  otherModeNames,
  collectionTempId,
  defaultModeTempId,
) {
  const variableCollections = [
    { action: 'CREATE', id: collectionTempId, name: collectionName, initialModeId: defaultModeTempId },
  ]

  const variableModes = [
    // variableCollectionId is required on every entry here, even UPDATE —
    // confirmed against Figma's real API, which 400s otherwise
    // ("Required value missing at variableModes.0.variableCollectionId").
    { action: 'UPDATE', id: defaultModeTempId, name: defaultModeName, variableCollectionId: collectionTempId },
    ...otherModeNames.map(name => ({
      action: 'CREATE',
      id: `temp-mode-${name}`,
      name,
      variableCollectionId: collectionTempId,
    })),
  ]

  return { variableCollections, variableModes }
}

export function buildBootstrapPayload(brandNames, collectionName = 'Design Tokens') {
  const collectionTempId = 'temp-collection-bootstrap'
  const baseModeTempId = 'temp-mode-Base'

  const { variableCollections, variableModes } = buildCollectionBootstrapPayload(
    collectionName,
    'Base',
    brandNames,
    collectionTempId,
    baseModeTempId,
  )

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

// Tablet/Desktop are CREATEd; Mobile is the collection's auto-created default mode, renamed —
// same "rename the default, create the rest" shape as the brand collection's Base.
const RESPONSIVE_BREAKPOINT_NAMES = ['Tablet', 'Desktop']

export function buildResponsiveBootstrapPayload(collectionName = 'Design Responsive Tokens') {
  const collectionTempId = 'temp-responsive-collection-bootstrap'
  const mobileModeTempId = 'temp-mode-Mobile'

  const { variableCollections, variableModes } = buildCollectionBootstrapPayload(
    collectionName,
    'Mobile',
    RESPONSIVE_BREAKPOINT_NAMES,
    collectionTempId,
    mobileModeTempId,
  )

  return { variableCollections, variableModes, collectionTempId, mobileModeTempId }
}

export function resolveResponsiveBootstrapIds(bootstrap, tempIdToRealId) {
  const collectionId = tempIdToRealId[bootstrap.collectionTempId]
  const modeIdByBreakpoint = { Mobile: tempIdToRealId[bootstrap.mobileModeTempId] }

  for (const breakpoint of RESPONSIVE_BREAKPOINT_NAMES) {
    modeIdByBreakpoint[breakpoint] = tempIdToRealId[`temp-mode-${breakpoint}`]
  }

  if (!collectionId || Object.values(modeIdByBreakpoint).some(id => !id)) {
    throw new Error(
      `Responsive bootstrap response didn't resolve every temp id — got tempIdToRealId: ${JSON.stringify(tempIdToRealId)}. ` +
        `Figma's API may not support pre-declaring initialModeId the way this assumes; check the raw response.`,
    )
  }

  return { collectionId, modeIdByBreakpoint }
}
