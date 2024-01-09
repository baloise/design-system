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
      className={`clipboard-button text-small py-xx-small px-x-small m-none text-small has-radius-normal`}
      onClick={copy}
      style={{ minHeight: '24px' }}
    >
      <pre>
        <code>{label}</code>
      </pre>
    </button>
  )
}
