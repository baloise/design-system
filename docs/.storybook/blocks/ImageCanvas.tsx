import React from 'react'

export const ImageCanvas = ({ children, size }) => {
  return (
    <div
      className={`sb-unstyled doc-image-canvas doc-image-canvas--size-${size || 'normal'} flex justify-content-center radius-normal bg-grey-2 p-normal gap-large`}
    >
      {children}
    </div>
  )
}
