import React from 'react'

export const ImageCanvas = ({ children, size }) => {
  return (
    <div
      className={`sb-unstyled doc-image-canvas doc-image-canvas--size-${size || 'normal'} is-flex is-justify-content-center has-radius-normal has-background-grey-2 p-normal fg-large`}
    >
      {children}
    </div>
  )
}
