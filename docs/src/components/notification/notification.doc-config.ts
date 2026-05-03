/**
 * Shared configuration for Notification component documentation pages.
 * Import and reuse this across all notification documentation MDX files to reduce duplication.
 */

export const NOTIFICATION_DOC_CONFIG = {
  section: 'Components / Notification',
  color: 'red' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-feedback-notification--overview' },
    { label: 'Usage', storyId: 'components-feedback-notification--usage' },
    { label: 'Variants', storyId: 'components-feedback-notification--variants-overview' },
    { label: 'Styling', storyId: 'components-feedback-notification--styling' },
    { label: 'Accessibility', storyId: 'components-feedback-notification--accessibility' },
  ],
}

export const NOTIFICATION_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
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
