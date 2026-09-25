import React from 'react'
import { navigate } from '@storybook/addon-links'
import componentsData from '../../src/assets/data/components.json'

const getComponentDescription = (component?: string): string | undefined => {
  if (!component) return undefined
  const tag = component.startsWith('ds-') ? component : `ds-${component}`
  const componentInfo = (componentsData.components as Array<any>).find(comp => comp.tag === tag)
  return componentInfo?.overview || componentInfo?.docs
}

export const ButtonCard = ({ children, target, color, icon, link, label, description, pageTitle, wide }) => {
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

  const Tag = link ? 'a' : 'button'
  if (wide) {
    return (
      <Tag
        {...linkObj}
        style={{ flex: 1 }}
        className={`sb-unstyled ds-button mb-none flex flex-1 w-full flex-direction-row gap-lg ${
          color ? (color === 'grey' ? 'is-tertiary' : `is-brand-${color}`) : 'is-secondary'
        } p-base text-lg`}
      >
        <span className="w-fit flex justify-content-center text-2xl text-align-center">
          {icon}
          {children}
        </span>
        <div className="flex-1 w-full flex flex-direction-column">
          <span className="block ds-title text-md text-align-left mb-none">{label}</span>
          <span className="block ds-text text-sm text-align-left">{description}</span>
        </div>
      </Tag>
    )
  }

  return (
    <Tag
      {...linkObj}
      style={{ flex: 1 }}
      className={`sb-unstyled ds-button mb-none flex flex-1 flex-direction-column ${
        color ? (color === 'grey' ? 'is-tertiary' : `is-brand-${color}`) : 'is-secondary'
      } p-base text-lg`}
    >
      <span className="flex justify-content-center text-2xl text-align-center">
        {icon}
        {children}
      </span>
      <span className="block ds-title text-md text-align-center mb-none">{label}</span>
      <span className="block ds-text text-sm text-align-center">{description}</span>
    </Tag>
  )
}

export const LinkCards = ({ children }) => {
  return <div className="sb-unstyled doc-link-cards">{children}</div>
}

export const LinkCard = ({ _children, _color, _icon, label, description, pageTitle, link }: Record<string, any>) => {
  const content = (
    <>
      <div className="flex-1 flex flex-direction-column justify-content-center align-items-start">
        <span className="block ds-title text-base mb-none">{label || pageTitle}</span>
        <span className="block ds-text text-align-left is-sm">{description}</span>
      </div>
      <span className="flex justify-content-center align-items-center text-2xl text-align-center">
        <ds-icon name="caret-right"></ds-icon>
      </span>
    </>
  )

  if (link) {
    return (
      <a href={link} target="_blank" className={`sb-unstyled ds-button is-secondary flex py-base`}>
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={() => {
        navigate({ title: pageTitle })
      }}
      className={`sb-unstyled ds-button is-secondary flex py-base`}
    >
      {content}
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
    <ds-root>
      <div
        className="sb-unstyled ds-grid is-multiline mt-base mb-xl"
        style={{ '--ds-column-gap': '1rem', 'userSelect': 'none' }}
      >
        {children}
      </div>
    </ds-root>
  )
}

export const GridComponent = ({
  children,
  _color,
  center,
  pageTitle,
  label,
  description,
  component,
  scale = '1',
  position = 'center',
  fullwidth,
  fullheight,
  fullscreen,
}) => {
  const resolvedDescription = description || getComponentDescription(component)
  const flexPosition =
    position === 'top'
      ? 'justify-content-center align-items-start'
      : position === 'bottom-end'
        ? 'justify-content-flex-end align-items-flex-end'
        : 'justify-content-center align-items-center'

  return (
    <div className="ds-col mobile:is-12 tablet:is-6 desktop:is-4">
      <div className="h-full">
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate({ title: pageTitle })}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              navigate({ title: pageTitle })
            }
          }}
          className={`flex flex-direction-column gap-base justify-content-center align-items-center bg-white p-base h-full radius-lg shadow doc-shadow-large-hover cursor-pointer`}
        >
          <div
            className={`bg-purple-1 radius w-full flex ${flexPosition} ${fullscreen ? '' : 'p-sm'}`}
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
            <h2 className="ds-title text-xl mb-2xs" id={label}>
              {label}
            </h2>
            <p className="h-full text-sm">{resolvedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GridCategory = ({ children, pageTitle, label, description }) => {
  return (
    <div className="ds-col is-12">
      <div className="h-full">
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate({ title: pageTitle })}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              navigate({ title: pageTitle })
            }
          }}
          className="flex flex-direction-column gap-base bg-white p-base h-full radius-lg shadow doc-shadow-large-hover cursor-pointer"
        >
          <div
            className="bg-purple-1 radius w-full flex flex-wrap gap-lg justify-content-center align-items-center p-lg"
            style={{ minHeight: '220px', position: 'relative' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'transparent', zIndex: 2000 }}></div>
            {children}
          </div>
          <div>
            <h2 className="ds-title mb-2xs">{label}</h2>
            <p className="ds-text mb-none">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GridCards = ({ children }) => {
  return (
    <div className="sb-unstyled ds-grid is-multiline mt-base" style={{ '--ds-column-gap': '.5rem' }}>
      {children}
    </div>
  )
}

export const GridCard = ({ _children, color, pageTitle, svg, label, description }) => {
  return (
    <div className="ds-col is-6">
      <div className="h-full">
        <button
          onClick={() => navigate({ title: pageTitle })}
          className={`ds-button flex gap-base justify-content-center align-items-center is-brand-${color} p-base h-full w-full`}
        >
          {svg ? (
            <div style={{ minWidth: '80px' }}>
              <img src={svg} style={{ width: '80px' }} />
            </div>
          ) : (
            ''
          )}
          {svg ? (
            <div className="flex-1 h-full text-align-left">
              <h2 className="ds-title text-lg mb-2xs">{label}</h2>
              <span className="ds-text text-sm h-full">{description}</span>
            </div>
          ) : (
            <div className="flex-1 h-full text-align-left">
              <h2 className="ds-title text-md mb-2xs">{label}</h2>
              <small className="ds-text text-sm h-full">{description}</small>
            </div>
          )}
          {!svg ? (
            <div>
              <ds-icon name="caret-right"></ds-icon>
            </div>
          ) : (
            ''
          )}
        </button>
      </div>
    </div>
  )
}
