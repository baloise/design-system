import React from 'react'
import { useOf } from '@storybook/addon-docs/blocks'
import { navigate } from '@storybook/addon-links'

import PuzzleGreen from '../../src/assets/images/home/puzzle-green-dark.svg'
import PuzzlePurple from '../../src/assets/images/home/puzzle-purple-dark.svg'
import PuzzleRed from '../../src/assets/images/home/puzzle-red-dark.svg'
import PuzzleYellow from '../../src/assets/images/home/puzzle-yellow-dark.svg'

export const Banner = ({ of, children, color, label, section, puzzle, tabs }): React.ReactElement => {
  let title = label
  let subtitle = section
  let isDeprecated = false
  let componentName = ''

  if (of) {
    const resolvedOf = useOf(of || 'story', ['meta'])
    const metaTitle = resolvedOf.preparedMeta.title
    const metaTitles = metaTitle.split('/')
    isDeprecated = metaTitles.includes('Deprecated')
    title = label || metaTitles[metaTitles.length - 1]
    subtitle = section || metaTitles.slice(0, -1).join(' / ')
    componentName = title.toLowerCase().replace(/\s+/g, '-')
  }

  const definedColor = (subtitle || '').includes('Components') ? 'red' : color || 'primary'
  const definedPuzzle = (subtitle || '').includes('Components') ? true : puzzle
  const background = isDeprecated ? 'bg-grey' : definedColor === 'primary' ? 'bg-purple-2' : `bg-${definedColor}-2`
  const text = background === 'bg-primary' ? 'text-white' : 'text-primary'
  const className = `sb-unstyled pt-lg pb-mb ${background} ${text}`

  const puzzles = {
    green: PuzzleGreen,
    purple: PuzzlePurple,
    yellow: PuzzleYellow,
    red: PuzzleRed,
  }

  return (
    <div>
      <div
        className={className}
        style={{
          marginTop: '0',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          minHeight: '10rem',
          position: 'relative',
        }}
      >
        <div className="flex gap-base" style={{ maxWidth: '1000px', margin: 'auto', position: 'relative' }}>
          <div className="flex-1">
            <span className="text text-lg mb-none">{subtitle}</span>
            <h1 className={`title text-4xl ${text} flex align-items-center gap-small`}>
              {isDeprecated ? <ds-icon color="warning-dark" name="alert-triangle" inline size="large"></ds-icon> : ''}{' '}
              {title}
            </h1>
            {children}
          </div>
          {definedPuzzle ? (
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                zIndex: 1001,
              }}
            >
              <img
                src={puzzles[definedColor]}
                style={{
                  width: '8rem',
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export const BannerTabs = ({ of, children, color, label, section, puzzle, tabs }): React.ReactElement => {
  let title = label
  let subtitle = section
  let isDeprecated = false
  let componentName = ''

  if (of) {
    const resolvedOf = useOf(of || 'story', ['meta'])
    const metaTitle = resolvedOf.preparedMeta.title
    const metaTitles = metaTitle.split('/')
    isDeprecated = metaTitles.includes('Deprecated')
    title = label || metaTitles[metaTitles.length - 1]
    subtitle = section || metaTitles.slice(0, -1).join(' / ')
    componentName = title.toLowerCase().replace(/\s+/g, '-')
  }

  const definedColor = (subtitle || '').includes('Components') ? 'red' : color || 'primary'
  const definedPuzzle = (subtitle || '').includes('Components') ? true : puzzle
  const background = isDeprecated ? 'bg-grey' : definedColor === 'primary' ? 'bg-primary' : `bg-${definedColor}-2`
  const text = background === 'bg-primary' ? 'text-white' : 'text-primary'
  const className = `sb-unstyled ${background} ${text}`

  const puzzles = {
    green: PuzzleGreen,
    purple: PuzzlePurple,
    yellow: PuzzleYellow,
    red: PuzzleRed,
  }

  return (
    <div
      className={className}
      style={{
        marginTop: '0',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {tabs && (
        <div
          style={{
            borderBottom: `2px solid #ffaca6`,
            // marginTop: '2rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: '1000px',
              margin: 'auto',
            }}
          >
            {tabs.map((tab, index) => (
              <a
                className="title hover:text-primary-hover active:text-primary-active text-align-center"
                key={index}
                href={tab.href}
                style={{
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderBottom: tab.active
                    ? `3px solid ${background === 'bg-primary' ? 'white' : 'currentColor'}`
                    : 'none',
                  borderRadius: 0,
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                }}
                onClick={e => {
                  e.preventDefault()
                  navigate({ title: tab.storyId })
                }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
