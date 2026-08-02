import React from 'react'
import { global } from '@storybook/global'

export const NotAngularFramework = ({ children }): React.ReactElement | null => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStoreValue.userGlobals.globals.framework

  if (globalFramework !== 'angular') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const AngularFramework = ({ children }): React.ReactElement | null => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStoreValue.userGlobals.globals.framework

  if (globalFramework === 'angular' || globalFramework === undefined || globalFramework === null) {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const ReactFramework = ({ children }): React.ReactElement | null => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStoreValue.userGlobals.globals.framework

  if (globalFramework === 'react') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}

export const HTMLFramework = ({ children }): React.ReactElement | null => {
  const globalFramework = global['__STORYBOOK_PREVIEW__'].storyStoreValue.userGlobals.globals.framework

  if (globalFramework === 'html') {
    return <div className="sbdocs-content">{children}</div>
  }

  return null
}
