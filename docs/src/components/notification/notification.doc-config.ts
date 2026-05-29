/**
 * Shared configuration for Notification component documentation pages.
 * Import and reuse this across all notification documentation MDX files to reduce duplication.
 */

export const NOTIFICATION_DOC_CONFIG = {
  section: 'Components / Notification',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-notification--notification' },
    { label: 'Usage', storyId: 'components-notification--usage' },
    { label: 'Variants', storyId: 'components-notification--variants-overview' },
    { label: 'Styling', storyId: 'components-notification--styling' },
    { label: 'Accessibility', storyId: 'components-notification--accessibility' },
    { label: 'Testing', storyId: 'components-notification--testing' },
  ],
}

export const NOTIFICATION_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getNotificationTabs('usage')
 */
export const getNotificationTabs = (activeLabel: keyof typeof NOTIFICATION_TAB_TITLES) => {
  return NOTIFICATION_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === NOTIFICATION_TAB_TITLES[activeLabel],
  }))
}
