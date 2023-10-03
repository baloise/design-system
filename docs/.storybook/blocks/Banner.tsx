
import React from 'react';
import { useOf } from '@storybook/blocks';

export const Banner = ({of, children, color}) => {
  const resolvedOf = useOf(of || 'story', ['meta']);
  const metaTitle = resolvedOf.preparedMeta.title
  const metaTitles = metaTitle.split('/')
  const title = metaTitles[metaTitles.length-1]
  const subtitle = metaTitles[metaTitles.length-2]

  const definedColor = color || 'primary'
  const background = `has-background-${definedColor}`
  const text = `has-text-${definedColor}-inverted`
  let className = `sb-unstyled has-radius-bottom-large pt-large pb-medium px-medium ${background} ${text}`;

  return <div className={className} style={{
    marginTop: '-1.5rem',
    marginLeft: '-1.5rem',
    marginRight: '-1.5rem',
    marginBottom: '3rem',
  }}>
    <span className='subtitle is-size-large mb-none'>{subtitle}</span>
    <h1 className={`title is-size-xxx-large ${text}`} style={{marginTop: '-0.5rem'}}>{title}</h1>
    {children}
  </div>
};

