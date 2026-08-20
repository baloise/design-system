/** See ADR-0021 and docs/plans/toky-live-token-preview-plan.md for the full contract. */
export type TokenPreviewMessage =
  | { source: 'ds-token-preview'; type: 'set-tokens'; tokens: { name: string; value: string | null }[] }
  | { source: 'ds-token-preview'; type: 'set-brand'; brand: string | null }
  | { source: 'ds-token-preview'; type: 'reset' }

export type TokenPreviewReadyMessage = { source: 'ds-token-preview'; type: 'ready' }
