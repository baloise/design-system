import React from 'react'
import { useOf } from '@storybook/blocks'

import PuzzleGreen from '../../stories/assets/images/home/puzzle-green-dark.svg'
import PuzzlePurple from '../../stories/assets/images/home/puzzle-purple-dark.svg'
import PuzzleYellow from '../../stories/assets/images/home/puzzle-yellow-dark.svg'
import PuzzleRed from '../../stories/assets/images/home/puzzle-red-dark.svg'

export const Banner = ({ of, children, color, label, section, puzzle }) => {
  let title = label
  let subtitle = section
  let isDeprecated = false

  if (of) {
    const resolvedOf = useOf(of || 'story', ['meta'])
    const metaTitle = resolvedOf.preparedMeta.title
    const metaTitles = metaTitle.split('/')
    isDeprecated = metaTitles.includes('Deprecated')
    title = label || metaTitles[metaTitles.length - 1]
    subtitle = section || metaTitles.slice(0, -1).join(' / ')
  }

  const definedColor = (subtitle || '').includes('Components') ? 'red' : color || 'primary'
  const definedPuzzle = (subtitle || '').includes('Components') ? true : puzzle
  const background = isDeprecated ? 'bg-grey' : definedColor === 'primary' ? 'bg-primary' : `bg-${definedColor}-2`
  const text = background === 'bg-primary' ? 'text-white' : 'text-primary'
  const className = `sb-unstyled radius-bottom-large pt-large pb-medium px-medium ${background} ${text}`

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
        marginTop: '-1.5rem',
        marginLeft: '-1.5rem',
        marginRight: '-1.5rem',
        marginBottom: '3rem',
        minHeight: '6rem',
        position: 'relative',
      }}
    >
      <div className="flex gap-normal">
        <div className="flex-1">
          <span className="subtitle text-large mb-none">{subtitle}</span>
          <h1
            className={`title text-xxxx-large ${text} flex align-items-center gap-small`}
            style={{ marginTop: '-0.5rem' }}
          >
            {isDeprecated ? <bal-icon color="warning-dark" name="alert-triangle" inline size="large"></bal-icon> : ''}{' '}
            {title}
          </h1>
          {children}
        </div>
        {definedPuzzle ? (
          <div
            style={{
              position: 'absolute',
              right: '1rem',
              bottom: '-3.5rem',
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
  )
}
