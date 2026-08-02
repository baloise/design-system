import React, { PropsWithChildren, useState } from 'react'

type Props = PropsWithChildren<{ index?: number; tabs: { label: string; content: React.ReactNode }[] }>

export const Tabs = ({ _children, tabs, index }: Props): React.ReactNode => {
  const [activeIndex, setActiveIndex] = useState(index ?? 0)

  return (
    <div className="sb-unstyled" style={{ marginTop: '48px', position: 'relative' }}>
      {/* Tab headers */}
      <div
        role="tablist"
        className="buttons"
        style={{ display: 'flex', position: 'absolute', zIndex: 1, right: 4, top: 4, justifyContent: 'end' }}
      >
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
