/**
 * Shared configuration for Stack component documentation pages.
 * Import and reuse this across all stack documentation MDX files to reduce duplication.
 */

export const STACK_DOC_CONFIG = {
  section: 'Components / Stack',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-stack-stack--stack' },
    { label: 'Usage', storyId: 'components-structure-stack-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-stack-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-stack-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-stack-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-stack-testing--testing' },
  ],
}

export const STACK_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getStackTabs('usage')
 */
export const getStackTabs = (activeLabel: keyof typeof STACK_TAB_TITLES) => {
  return STACK_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === STACK_TAB_TITLES[activeLabel],
  }))
}
