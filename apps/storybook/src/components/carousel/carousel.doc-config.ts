/**
 * Shared configuration for Carousel component documentation pages.
 */

export const CAROUSEL_DOC_CONFIG = {
  section: 'Components / Carousel',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-carousel-carousel--carousel' },
    { label: 'Usage', storyId: 'components-carousel-usage--usage' },
    { label: 'Variants', storyId: 'components-carousel-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-carousel-styling--styling' },
    { label: 'Accessibility', storyId: 'components-carousel-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-carousel-testing--testing' },
  ],
}

export const CAROUSEL_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getCarouselTabs = (activeLabel: keyof typeof CAROUSEL_TAB_TITLES) => {
  return CAROUSEL_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CAROUSEL_TAB_TITLES[activeLabel],
  }))
}
