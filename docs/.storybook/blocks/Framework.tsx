import React from 'react'
import { global } from '@storybook/global'

export const NotAngularFramework = ({ children }) => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework

  if (globalFramework !== 'angular') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const AngularFramework = ({ children }) => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework

  if (globalFramework === 'angular' || globalFramework === undefined || globalFramework === null) {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const ReactFramework = ({ children }) => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework

  if (globalFramework === 'react') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const VueFramework = ({ children }) => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework

  if (globalFramework === 'vue') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const HTMLFramework = ({ children }) => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework

  if (globalFramework === 'html') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}
