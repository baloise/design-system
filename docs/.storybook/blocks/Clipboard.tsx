import React from 'react'

export const Clipboard = ({ label, value }) => {
  function copy() {
    navigator.clipboard.writeText(value)
  }

  return (
    <button
      className="button is-light is-size-small py-xx-small px-x-small m-none is-size-small"
      onClick={copy}
      title="Copy to clipboard"
      style={{ minHeight: '24px' }}
    >
      {label}
    </button>
  )
}
