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
    <>
      <style>{`
        .usage-examples-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .usage-examples-grid {
            grid-template-columns: 50% 50%;
          }
        }
      `}</style>
      <div className="sb-unstyled mt-lg usage-examples-grid">
        {items.map((item, index) => {
          const isCorrect = item.type === 'correct'
          const iconColor = isCorrect ? '#00b28f' : '#d9304c'
          const iconName = isCorrect ? 'check' : 'close'
          const titleColor = isCorrect ? '#00b28f' : '#d9304c'

          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="stack as-row align-top-start">
                <ds-icon
                  name={iconName}
                  size="md"
                  style={{ '--icon-color': iconColor } as React.CSSProperties}
                ></ds-icon>
                <h4 className="title" style={{ color: titleColor, marginBottom: '1rem' }}>
                  {item.title}
                </h4>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  textAlign: item.contentIsLeftAligned ? 'left' : 'center',
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: '1.5rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: item.contentIsLeftAligned ? 'left' : 'center',
                  }}
                >
                  {item.content}
                </div>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
