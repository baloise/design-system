import React from 'react'

export interface ExampleItem {
  type: 'correct' | 'incorrect'
  title: string
  content: React.ReactNode
  description: string
  contentIsLeftAligned?: boolean
}

interface UsageExamplesProps {
  items: ExampleItem[]
}

export const UsageExamples = ({ items }: UsageExamplesProps): React.ReactElement => {
  return (
    <div
      className="sb-unstyled mt-lg"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}
    >
      {items.map((item, index) => {
        const isCorrect = item.type === 'correct'
        const iconColor = isCorrect ? '#00b28f' : '#d9304c'
        const iconName = isCorrect ? 'check' : 'close'
        const titleColor = isCorrect ? '#00b28f' : '#d9304c'

        return (
          <div key={index}>
            <div className="stack as-row align-top-start">
              <ds-icon name={iconName} size="md" style={{ '--icon-color': iconColor } as React.CSSProperties}></ds-icon>
              <h4 className="title" style={{ color: titleColor, marginBottom: '1rem' }}>
                {item.title}
              </h4>
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                textAlign: item.contentIsLeftAligned ? 'left' : 'center',
              }}
            >
              <div style={{ marginBottom: '1rem', textAlign: item.contentIsLeftAligned ? 'left' : 'center' }}>
                {item.content}
              </div>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
