/**
 * Shared configuration for Accordion component documentation pages.
 * Import and reuse this across all accordion documentation MDX files to reduce duplication.
 */

export const ACCORDION_DOC_CONFIG = {
  section: 'Components / Accordion',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-accordion--overview' },
    { label: 'Usage', storyId: 'components-accordion--usage' },
    { label: 'Variants', storyId: 'components-accordion--variants-overview' },
    { label: 'Styling', storyId: 'components-accordion--styling' },
    { label: 'Accessibility', storyId: 'components-accordion--accessibility' },
  ],
}

export const ACCORDION_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getAccordionTabs('usage')
 */
export const getAccordionTabs = (activeLabel: keyof typeof ACCORDION_TAB_TITLES) => {
  return ACCORDION_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === ACCORDION_TAB_TITLES[activeLabel],
  }))
}
