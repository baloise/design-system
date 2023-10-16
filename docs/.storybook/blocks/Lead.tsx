import React from 'react'

export const Lead = ({ children }) => {
  return (
    <span className="sb-unstyled is-size-large has-text-primary my-x-large">
      {children}
      <br />
    </span>
  )
}
