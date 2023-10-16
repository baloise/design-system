import React from 'react';

export const ButtonCard = ({ children, color, icon, link, label, description }) => {
  return <a href={link} target='_blank' style={{flex: 1}} className={`sb-unstyled mb-none doc-button-card doc-shadow-hover is-flex is-flex-grow-1 is-flex-direction-column has-background-${color || 'primary'}-1 p-normal has-radius-normal is-size-large has-text-primary`}
  >
    <span className='is-flex is-justify-content-center is-size-xx-large has-text-centered'>{icon}{children}</span>
    <span className='is-block title is-size-medium has-text-centered mb-none'>{label}</span>
    <span className='is-block is-size-small has-text-centered'>{description}</span>
  </a>
};

export const Button = ({ children, color, label }) => {
  return <button className={`sb-unstyled button ${color ? `is-${color}`: ''}`}
  >
    {label}{children}
  </button>
};

export const ButtonLink = ({ children, color, target, link, label }) => {
  return <a href={link} target={target ||'_blank'} className={`sb-unstyled button ${color ? `is-${color}`: ''}`}
  >
    {label}{children}
  </a>
};
