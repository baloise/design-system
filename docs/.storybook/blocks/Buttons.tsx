import React from 'react'
import { navigate } from '@storybook/addon-links'

export const ButtonCard = ({ children, target, color, icon, link, label, description, pageTitle }) => {
  let linkObj = {}
  if (link) {
    linkObj = { ...linkObj, link, target: target || '_blank' }
  }

  if (pageTitle) {
    linkObj = {
      ...linkObj,
      onClick: () => {
        navigate({ title: pageTitle })
      },
    }
  }

  return (
    <a
      {...linkObj}
      style={{ flex: 1 }}
      className={`sb-unstyled mb-none doc-button-card doc-shadow-hover is-flex is-flex-grow-1 is-flex-direction-column has-background-${
        color ? (color === 'grey' ? 'grey-3' : `${color}-2`) : 'primary-1'
      } p-normal has-radius-normal is-size-large has-text-primary`}
    >
      <span className="is-flex is-justify-content-center is-size-xx-large has-text-centered">
        {icon}
        {children}
      </span>
      <span className="is-block title is-size-medium has-text-centered mb-none">{label}</span>
      <span className="is-block is-size-small has-text-centered">{description}</span>
    </a>
  )
}

export const LinkCards = ({ children }) => {
  return <div className="sb-unstyled doc-link-cards">{children}</div>
}

export const LinkCard = ({ children, color, icon, label, description, pageTitle }) => {
  return (
    <a
      onClick={() => {
        navigate({ title: pageTitle })
      }}
      className={`sb-unstyled mb-none doc-button-card doc-shadow-hover is-flex is-flex-1 is-flex-direction-row has-background-${
        color ? (color === 'grey' ? 'grey-3' : `${color}-2`) : 'primary-1'
      } p-normal has-radius-normal is-size-large has-text-primary fg-normal`}
    >
      <div className="is-flex-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-start">
        <span className="is-block title is-size-normal mb-none">{label || pageTitle}</span>
        <span className="is-block is-size-small">{description}</span>
      </div>
      <span className="is-flex is-justify-content-center is-align-items-center is-size-xx-large has-text-centered">
        <bal-icon name="nav-go-right"></bal-icon>
      </span>
    </a>
  )
}

export const Button = ({ children, color, label }) => {
  return (
    <button className={`sb-unstyled button ${color ? `is-${color}` : ''}`}>
      {label}
      {children}
    </button>
  )
}

export const ButtonLink = ({ children, color, target, link, label }) => {
  return (
    <a href={link} target={target || '_blank'} className={`sb-unstyled button ${color ? `is-${color}` : ''}`}>
      {label}
      {children}
    </a>
  )
}
