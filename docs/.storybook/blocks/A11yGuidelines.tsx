import React from 'react'

export interface A11yGuidelineItem {
  title: string
  content: React.ReactNode
  type: 'do' | 'dont'
}

interface A11yGuidelinesProps {
  items: A11yGuidelineItem[]
}

export const A11yGuidelines = ({ items }: A11yGuidelinesProps): React.ReactElement => {
  return (
    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
      {items.map((item, index) => {
        const isDo = item.type === 'do'
        const borderColor = isDo ? '#00b28f' : '#d9304c'
        const icon = isDo ? '✓' : '✗'

        return (
          <div
            key={index}
            className="stack as-row"
            style={{
              padding: '1rem',
              backgroundColor: '#fafafa',
              borderRadius: '12px',
              border: `2px dashed ${borderColor}`,
            }}
          >
            <ds-icon
              name={isDo ? 'check' : 'close'}
              size="md"
              style={{ '--icon-color': borderColor } as React.CSSProperties}
            ></ds-icon>
            <div className="content">
              <strong className="title is-lg">{item.title}</strong>
              <div style={{ margin: '0.5rem 0 0 0' }}>{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
