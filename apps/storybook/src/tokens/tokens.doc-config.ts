/**
 * Shared configuration for Tokens documentation pages.
 * Import and reuse this across all token documentation MDX files to reduce duplication.
 */

export const TOKENS_DOC_CONFIG = {
  section: 'Tokens',
  color: 'green' as const,
  tabs: [
    { label: 'All Design Tokens', storyId: 'tokens-all-tokens' },
    { label: 'Design Tokens Explained', storyId: 'tokens-design-tokens-explained' },
    { label: 'Use Tokens in Code', storyId: 'tokens-use-tokens-in-code' },
    { label: 'Component Variables', storyId: 'tokens-component-variables' },
  ],
}

export const TOKENS_TAB_TITLES = {
  allTokens: 'All Design Tokens',
  explained: 'Design Tokens Explained',
  code: 'Use Tokens in Code',
  componentVariables: 'Component Variables',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTokensTabs('code')
 */
export const getTokensTabs = (activeLabel: keyof typeof TOKENS_TAB_TITLES) => {
  return TOKENS_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TOKENS_TAB_TITLES[activeLabel],
  }))
}
