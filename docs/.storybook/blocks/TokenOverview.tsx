import React, { useState, useEffect } from 'react'
import tokens from '../../stories/assets/data/tokens.docs.json'

export const TokenOverview = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const matchesSearch = item => {
    if (typeof item === 'object' && item !== null) {
      if ('name' in item && item.name.toLowerCase().includes(searchQuery)) {
        return true
      }
      return Object.values(item).some(subItem => matchesSearch(subItem))
    }
    return false
  }

  const renderItem = (item, key) => {
    if (typeof item === 'object' && item !== null) {
      if ('name' in item && 'value' in item) {
        if (!searchQuery || item.name.toLowerCase().includes(searchQuery)) {
          return (
            <div key={key} className="token-item">
              <div>{item.name}</div>
              <div>{item.value}</div>
            </div>
          )
        }
      } else {
        const matchedSubItems = Object.entries(item).filter(([subKey, subValue]) => matchesSearch(subValue))
        if (matchedSubItems.length > 0) {
          return (
            <div key={key} className="token-subsection">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <div className="token-list">
                {matchedSubItems.map(([subKey, subValue]) => renderItem(subValue, subKey))}
              </div>
            </div>
          )
        }
      }
    }
    return null
  }

  return (
    <div className="design-tokens">
      <input type="text" placeholder="Search tokens..." value={searchQuery} onChange={handleSearchChange} />
      {Object.entries(tokens).map(([sectionKey, sectionValue]) => {
        if (!searchQuery || matchesSearch(sectionValue)) {
          return (
            <div key={sectionKey} className="token-section">
              <h2>{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h2>
              <div className="token-list">
                {Object.entries(sectionValue).map(([itemKey, itemValue]) => {
                  if (matchesSearch(itemValue)) {
                    return renderItem(itemValue, itemKey)
                  }
                  return null
                })}
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
