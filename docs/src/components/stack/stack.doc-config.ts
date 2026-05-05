/**
 * Shared configuration for Stack component documentation pages.
 * Import and reuse this across all stack documentation MDX files to reduce duplication.
 */

export const STACK_DOC_CONFIG = {
  section: 'Components / Stack',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-stack--overview' },
    { label: 'Usage', storyId: 'components-stack--usage' },
    { label: 'Variants', storyId: 'components-stack--variants-overview' },
    { label: 'Styling', storyId: 'components-stack--styling' },
    { label: 'Accessibility', storyId: 'components-stack--accessibility' },
  ],
}

export const STACK_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
