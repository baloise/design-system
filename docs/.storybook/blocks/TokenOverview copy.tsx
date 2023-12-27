import React, { useState, useEffect } from 'react'
import tokens from '../../stories/assets/data/tokens.docs.json'

export const TokenOverview = ({ children }) => {
  const renderItem = (item, key) => {
    if (typeof item === 'object' && item !== null) {
      if ('name' in item && 'value' in item) {
        return (
          <button type="button" className="sb-unstyled button is-light is-small">
          <span>{item.name}</span>
        </button>
        );
      } else {
        return (
          <div key={key} className="token-subsection">
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <div className="token-description">
              <div>Token Description</div>
            </div>
            <div className="is-flex fg-normal has-background-grey-2">
              {Object.entries(item).map(([childKey, childValue]) => 
                renderItem(childValue, childKey))
              }
            </div>
          </div>
        );
      }
    } else {
      return (
        <button type="button" className="sb-unstyled button is-light is-small">
        <span>{item.name}</span>
      </button>
      );
    }
  };

  return (
    <div className="design-tokens">
    {Object.entries(tokens).map(([sectionKey, sectionValue]) => (
      <div key={sectionKey} className="token-section">
        <h2>{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h2>
        <div className="token-list">
          {Object.entries(sectionValue).map(([itemKey, itemValue]) => 
              renderItem(itemValue, itemKey))
          }
        </div>
      </div>
    ))}
  </div>
  )
}
