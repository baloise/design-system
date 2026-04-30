import React from 'react'
import { navigate } from '@storybook/addon-links'

export const ButtonCard = ({ children, target, color, icon, link, label, description, pageTitle }) => {
  let linkObj = {}
  if (link) {
    linkObj = { ...linkObj, href: link, target: target || '_blank' }
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
    <button
      {...linkObj}
      style={{ flex: 1 }}
      className={`sb-unstyled button mb-none flex flex-1 flex-direction-column ${
        color ? (color === 'grey' ? 'is-tertiary' : `is-tertiary-${color}`) : 'is-tertiary'
      } p-normal text-large`}
    >
      <span className="flex justify-content-center text-xx-large text-align-center">
        {icon}
        {children}
      </span>
      <span className="block title text-medium text-align-center mb-none">{label}</span>
      <span className="block text text-small text-align-center">{description}</span>
    </button>
  )
}

export const LinkCards = ({ children }) => {
  return <div className="sb-unstyled doc-link-cards">{children}</div>
}

export const LinkCard = ({ children, color, icon, label, description, pageTitle }) => {
  return (
    <button
      onClick={() => {
        navigate({ title: pageTitle })
      }}
      className={`sb-unstyled button is-secondary flex py-base`}
    >
      <div className="flex-1 flex flex-direction-column justify-content-center align-items-start">
        <span className="block title text-normal mb-none">{label || pageTitle}</span>
        <span className="block text text-align-left is-small">{description}</span>
      </div>
      <span className="flex justify-content-center align-items-center text-xx-large text-align-center">
        <ds-icon name="nav-go-right"></ds-icon>
      </span>
    </button>
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
    <ds-app>
      <div
        className="sb-unstyled grid is-multiline mt-normal"
        style={{ '--ds-column-gap': '.5rem', 'userSelect': 'none' }}
      >
        {children}
      </div>
    </ds-app>
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
      ? 'justify-content-center align-items-start'
      : position === 'bottom-end'
        ? 'justify-content-flex-end align-items-flex-end'
        : 'justify-content-center align-items-center'

  return (
    <div className="col is-6">
      <div className="h-full">
        <a
          onClick={() => navigate({ title: pageTitle })}
          className={`flex flex-direction-column gap-normal justify-content-center align-items-center bg-white p-normal h-full radius shadow doc-shadow-large-hover cursor-pointer`}
        >
          <div
            className={`bg-red-1 radius w-full flex ${flexPosition} ${fullscreen ? '' : 'p-small'}`}
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
          <div className="flex-1 h-full w-full">
            <h2 className="title text-medium mb-xx-small" id={label}>
              {label}
            </h2>
            <small className="h-full">{description}</small>
          </div>
        </a>
      </div>
    </div>
  )
}

export const GridCards = ({ children }) => {
  return (
    <div className="sb-unstyled grid is-multiline mt-normal" style={{ '--ds-column-gap': '.5rem' }}>
      {children}
    </div>
  )
}

export const GridCard = ({ children, color, pageTitle, svg, label, description }) => {
  return (
    <div className="col is-6">
      <div className="h-full">
        <button
          onClick={() => navigate({ title: pageTitle })}
          className={`button flex gap-normal justify-content-center align-items-center is-tertiary-${color} p-normal h-full w-full`}
        >
          {svg ? (
            <div style={{ minWidth: '80px' }}>
              <img src={svg} style={{ width: '80px' }} />
            </div>
          ) : (
            ''
          )}
          {svg ? (
            <div className="flex-1 h-full  text-align-left">
              <h2 className="title text-large mb-xx-small">{label}</h2>
              <span className="text text-small h-full">{description}</span>
            </div>
          ) : (
            <div className="flex-1 h-full  text-align-left">
              <h2 className="title text-medium mb-xx-small">{label}</h2>
              <small className="text text-small h-full">{description}</small>
            </div>
          )}
          {!svg ? (
            <div>
              <ds-icon name="nav-go-right"></ds-icon>
            </div>
          ) : (
            ''
          )}
        </button>
      </div>
    </div>
  )
}
