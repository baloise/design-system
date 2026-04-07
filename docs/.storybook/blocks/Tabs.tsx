import React, { PropsWithChildren, useState } from 'react'

type Props = PropsWithChildren<{ index?: number; tabs: { label: string; content: React.ReactNode }[] }>

export const Tabs = ({ children, tabs, index }: Props): React.ReactNode => {
  const [activeIndex, setActiveIndex] = useState(index ?? 0)

  return (
    <div className="sb-unstyled">
      {/* Tab headers */}
      <div role="tablist" className="buttons" style={{ display: 'flex', marginTop: '48px' }}>
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`button is-small ${activeIndex === index ? 'is-primary' : 'is-secondary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel" style={{ padding: '0', marginTop: '-15px' }}>
        {tabs[activeIndex].content}
      </div>
    </div>
  )
}
