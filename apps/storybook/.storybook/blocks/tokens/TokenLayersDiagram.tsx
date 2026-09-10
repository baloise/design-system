import React from 'react'

// Mirrors the layer color-coding used in apps/toky's token graph (LAYER_BORDER_COLOR in
// app/token-graph.tsx) so the two diagrams read as the same visual language.
const LAYER_COLORS: Record<string, { border: string; bg: string }> = {
  amber: { border: '#f59e0b', bg: '#fffbeb' },
  sky: { border: '#38bdf8', bg: '#f0f9ff' },
  teal: { border: '#2dd4bf', bg: '#f0fdfa' },
  emerald: { border: '#34d399', bg: '#ecfdf5' },
}

interface Layer {
  color: keyof typeof LAYER_COLORS
  icon: string
  title: string
  subtitle: string
  examples: string[]
  caption: string
}

const layers: Layer[] = [
  {
    color: 'amber',
    icon: '🌐',
    title: 'Global',
    subtitle: 'Raw design values',
    examples: ['--ds-global-color-primary-5', '--ds-global-color-neutral-2', '--ds-global-font-size-16'],
    caption: 'Actual values (#hex, px, rem)',
  },
  {
    color: 'sky',
    icon: '🔗',
    title: 'Alias',
    subtitle: 'Design intent',
    examples: ['--ds-alias-bg-color-primary', '--ds-alias-text-color-primary', '--ds-alias-border-color-primary'],
    caption: 'Named for purpose, not value',
  },
  {
    color: 'teal',
    icon: '📱',
    title: 'Device',
    subtitle: 'Responsive values',
    examples: ['--ds-device-text-size-xl', '--ds-device-space-16', '--ds-device-text-size-xl-mobile'],
    caption: 'Auto-switches at breakpoints',
  },
  {
    color: 'emerald',
    icon: '🧩',
    title: 'Component',
    subtitle: 'UI-specific decisions',
    examples: ['--ds-button-primary-color-bg-base', '--ds-input-primary-border-base', '--ds-card-shadow-elevation'],
    caption: 'Points to alias/device tokens',
  },
]

const DownArrow = (): React.ReactElement => (
  <div
    aria-hidden="true"
    style={{
      display: 'flex',
      justifyContent: 'center',
      color: '#9ca3af',
      fontSize: '1.25rem',
      lineHeight: 1,
      padding: '0.125rem 0',
    }}
  >
    ↓
  </div>
)

export const TokenLayersDiagram = (): React.ReactElement => (
  <div className="sb-unstyled" style={{ display: 'flex', flexDirection: 'column', margin: '2rem 0' }}>
    {layers.map((layer, index) => {
      const colors = LAYER_COLORS[layer.color]
      return (
        <React.Fragment key={layer.title}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              border: `2px solid ${colors.border}`,
              backgroundColor: colors.bg,
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
            }}
          >
            <div style={{ flex: '0 0 170px', minWidth: '170px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e' }}>
                {layer.icon} {layer.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{layer.subtitle}</div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.5rem' }}>↳ {layer.caption}</div>
            </div>
            <div style={{ flex: '1 1 320px', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {layer.examples.map(example => (
                <code
                  key={example}
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.5rem',
                    color: '#1a1a2e',
                  }}
                >
                  {example}
                </code>
              ))}
            </div>
          </div>
          {index < layers.length - 1 && <DownArrow />}
        </React.Fragment>
      )
    })}
  </div>
)
