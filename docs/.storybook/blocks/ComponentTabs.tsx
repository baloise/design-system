import React, { useState, useEffect } from 'react'

export interface ComponentTab {
  label: string
  id: string
  content: React.ReactNode
}

interface ComponentTabsProps {
  tabs: ComponentTab[]
  defaultTab?: string
}

/**
 * ComponentTabs - Reusable tabbed documentation component
 * Syncs tab state with URL hash for deep linking and persistence
 * Example: #usage, #code, #a11y
 */
export const ComponentTabs: React.FC<ComponentTabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  // Sync with URL hash on mount and when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const validTab = tabs.find(t => t.id === hash)
      if (validTab) {
        setActiveTab(hash)
      } else if (activeTab === '') {
        setActiveTab(defaultTab || tabs[0]?.id || '')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [tabs, defaultTab])

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    window.location.hash = tabId
  }

  const activeTabData = tabs.find(t => t.id === activeTab)

  if (tabs.length === 1) {
    return <div className="sb-unstyled">{tabs[0].content}</div>
  }

  return (
    <div className="sb-unstyled" style={{ display: 'flex', flexDirection: 'column', margin: '2rem 0' }}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '2px solid #e8e8e8',
          borderRadius: '4px 4px 0 0',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className="title hover:text-primary-hover active:text-primary-active"
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#000d6e' : '#000d6e',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: '1.5',
              marginBottom: '-2px',
              zIndex: 100,
              borderBottom: activeTab === tab.id ? '2px solid #000d6e' : '2px solid transparent',
              transition: 'all 150ms ease-in-out',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${activeTab}`} style={{}}>
        {activeTabData?.content}
      </div>
    </div>
  )
}
