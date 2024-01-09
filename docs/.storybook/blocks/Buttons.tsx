import React from 'react'
import { navigate } from '@storybook/addon-links'

export const ButtonCard = ({ children, target, color, icon, link, label, description, pageTitle }) => {
  let linkObj = {}
  if (link) {
    linkObj = { ...linkObj, href:link, target: target || '_blank' }
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
      } p-normal has-radius-normal text-large has-text-primary`}
    >
      <span className="is-flex is-justify-content-center text-xx-large has-text-centered">
        {icon}
        {children}
      </span>
      <span className="is-block title text-medium has-text-centered mb-none">{label}</span>
      <span className="is-block text-small has-text-centered">{description}</span>
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
      } p-normal has-radius-normal text-large has-text-primary fg-normal`}
    >
      <div className="is-flex-1 is-flex is-flex-direction-column is-justify-content-center is-align-items-start">
        <span className="is-block title text-normal mb-none">{label || pageTitle}</span>
        <span className="is-block text-small">{description}</span>
      </div>
      <span className="is-flex is-justify-content-center is-align-items-center text-xx-large has-text-centered">
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

export const GridComponents = ({ children }) => {
  return (
    <bal-doc-app>
      <div className="sb-unstyled grid is-multiline mt-normal" style={{ '--bal-column-gap': '.5rem', userSelect: 'none' }}>
        {children}
      </div>
    </bal-doc-app>
  )
}

export const GridComponent = ({
  children,
  color,
  center,
  pageTitle,
  label,
  description,
  scale = '1',
  position = 'center',
  fullwidth,
  fullheight,
  fullscreen,
}) => {
  const flexPosition =
    position === 'top'
      ? 'is-justify-content-center is-align-items-start'
      : position === 'bottom-end'
      ? 'is-justify-content-flex-end is-align-items-flex-end'
      : 'is-justify-content-center is-align-items-center'

  return (
    <div className="column is-6">
      <div className="is-fullheight">
        <a
          onClick={() => navigate({ title: pageTitle })}
          className={`is-flex is-flex-direction-column fg-normal is-justify-content-center is-align-items-center has-background-white p-normal is-fullheight has-radius-normal has-shadow-normal doc-shadow-large-hover is-clickable`}
        >
          <div
            className={`has-background-red-1 has-radius-normal is-fullwidth is-flex ${flexPosition} ${
              fullscreen ? '' : 'p-small'
            }`}
            style={{ height: '200px', minHeight: '200px', maxWidth: '200%', overflow: 'hidden', position: 'relative' }}
          >
            <div
              style={{ position: 'absolute', background: 'transparent', height: '200px', width: '100%', zIndex: 2000 }}
            ></div>
            <div
              style={{
                scale: scale || '1',
                position: 'relative',
                minWidth: fullwidth ? `calc(100% * ${1 / parseFloat(scale)})` : 'auto',
                minHeight: fullheight ? `${200 / parseFloat(scale)}px` : 'auto',
                display: center ? 'flex' : 'block',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </div>
          </div>
          <div className="is-flex-1 is-fullheight is-fullwidth">
            <h2 className="title text-medium mb-xx-small" id={label}>
              {label}
            </h2>
            <small className="is-fullheight">{description}</small>
          </div>
        </a>
      </div>
    </div>
  )
}

export const GridCards = ({ children }) => {
  return (
    <div className="sb-unstyled grid is-multiline mt-normal" style={{ '--bal-column-gap': '.5rem' }}>
      {children}
    </div>
  )
}

export const GridCard = ({ children, color, pageTitle, svg, label, description }) => {
  return (
    <div className="column is-6">
      <div className="is-fullheight">
        <a
          onClick={() => navigate({ title: pageTitle })}
          className={`is-flex fg-normal is-justify-content-center is-align-items-center has-background-${color}-1 p-normal is-fullheight has-radius-normal doc-shadow-hover is-clickable`}
        >
          {svg ? (
            <div style={{ minWidth: '80px' }}>
              <img src={svg} style={{ width: '80px' }} />
            </div>
          ) : (
            ''
          )}
          {svg ? (
            <div className="is-flex-1 is-fullheight">
              <h2 className="title text-large mb-xx-small">{label}</h2>
              <span className="is-fullheight">{description}</span>
            </div>
          ) : (
            <div className="is-flex-1 is-fullheight">
              <h2 className="title text-medium mb-xx-small">{label}</h2>
              <small className="is-fullheight">{description}</small>
            </div>
          )}
          {!svg ? (
            <div>
              <bal-icon name="nav-go-right"></bal-icon>
            </div>
          ) : (
            ''
          )}
        </a>
      </div>
    </div>
  )
}
