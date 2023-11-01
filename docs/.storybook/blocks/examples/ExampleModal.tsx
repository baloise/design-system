import React, { useEffect, useRef } from 'react'

export const ExampleModal = ({ children }) => {
  const modalRef = useRef<any>(null)

  useEffect(() => {
    debugger
    modalRef.current.present()
  })

  return (
    <bal-modal ref={modalRef}>
      <bal-modal-header>Modal Title</bal-modal-header>
      <bal-modal-body>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing?</p>
        <bal-button-group position="right" reverse>
          <bal-button color="text">Cancel</bal-button>
          <bal-button color="primary">Okay</bal-button>
        </bal-button-group>
      </bal-modal-body>
    </bal-modal>
  )
}
