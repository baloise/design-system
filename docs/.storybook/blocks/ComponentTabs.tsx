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

  return (
    <div className="sb-unstyled" style={{ display: 'flex', flexDirection: 'column', margin: '24px 0' }}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '2px solid #e9e9e9',
          background: '#f9f9f9',
          borderRadius: '4px 4px 0 0',
          overflow: 'hidden',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#2563eb' : '#666',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: '14px',
              lineHeight: '1.5',
              borderBottom: activeTab === tab.id ? '3px solid #2563eb' : 'none',
              marginBottom: '-2px',
              transition: 'all 150ms ease-in-out',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#2563eb'
                e.currentTarget.style.background = '#f0f0f0'
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#666'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        style={{
          padding: '24px',
          background: '#fff',
          border: '1px solid #e9e9e9',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
        }}
      >
        {activeTabData?.content}
      </div>
    </div>
  )
}
