import React from 'react'

export const Clipboard = ({ label, value = '' }) => {
  if (!value) {
    value = label
  }

  function copy() {
    navigator.clipboard.writeText(value || '')
  }

  return (
    <button
      className={`clipboard-button text-sm py-2xs px-xs m-none radius`}
      onClick={copy}
      style={{ minHeight: '24px' }}
    >
      <pre>
        <code className="text-sm">{label}</code>
      </pre>
    </button>
  )
}
