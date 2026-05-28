/**
 * Shared configuration for Carousel component documentation pages.
 */

export const CAROUSEL_DOC_CONFIG = {
  section: 'Components / Carousel',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-carousel--overview' },
    { label: 'Usage', storyId: 'components-carousel--usage' },
    { label: 'Variants', storyId: 'components-carousel--variants-overview' },
    { label: 'Styling', storyId: 'components-carousel--styling' },
    { label: 'Accessibility', storyId: 'components-carousel--accessibility' },
  ],
}

export const CAROUSEL_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getCarouselTabs = (activeLabel: keyof typeof CAROUSEL_TAB_TITLES) => {
  return CAROUSEL_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CAROUSEL_TAB_TITLES[activeLabel],
  }))
}
