
import { Unstyled, useOf } from '@storybook/blocks';
import React from 'react';

export const StoryHeading = ({ of, children, hidden }) => {
  const { story } = useOf(of || 'story', ['story']);
  const id = (children || story.id).toString().trim().toLowerCase()

  return <Unstyled>
    <h2 id={id} className='sb-unstyled title has-text-primary is-size-xxx-large' style={{
      marginBottom: hidden === true ? '0': '.5rem',
      marginTop: hidden === true ? '0': '4rem',
      paddingBottom: hidden === true ? '0': '4px',
      borderBottom: hidden === true ? '0': '1px solid hsla(203, 50%, 30%, 0.15)',
      lineHeight: hidden === true ? '0' : 'var(--bal-line-height-desktop-xxx-large)',
      visibility: hidden === true ? 'hidden' : 'visible'
    }}>
      <a aria-hidden="true" href={`#${id}`} tabIndex={-1} target="_self" style={{
        float: 'left',
        lineHeight: 'inherit',
        paddingRight: '10px',
        marginLeft: '-24px',
        color: 'inherit',
      }}>
        <svg viewBox="0 0 14 14" width="14px" height="14px">
          <path d="M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z"></path><path d="M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z"></path>
        </svg>
      </a>
      {children || story.name}
    </h2>
  </Unstyled>
};

// export const Heading3 = ({ of, children }) => {
//   const { story } = useOf(of || 'story', ['story']);
//   const id = (children || story.id).toString().trim().toLowerCase()

//   return <Unstyled><h3 id={id} className='sb-unstyled title has-text-primary is-size-x-large'>{children || story.name}</h3></Unstyled>
// };

// export const Heading4 = ({ of, children }) => {
//   const { story } = useOf(of || 'story', ['story']);
//   const id = (children || story.id).toString().trim().toLowerCase()

//   return <Unstyled><h4 id={id} className='sb-unstyled title has-text-primary is-size-large'>{children || story.name}</h4></Unstyled>
// };

// export const Heading5 = ({ of, children }) => {
//   const { story } = useOf(of || 'story', ['story']);
//   const id = (children || story.id).toString().trim().toLowerCase()

//   return <Unstyled><h5 id={id} className='sb-unstyled title has-text-primary is-size-medium'>{children || story.name}</h5></Unstyled>
// };
