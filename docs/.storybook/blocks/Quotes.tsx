import React from 'react';

export const InfoQuote = ({ children }) => {
  return <div className='sb-unstyled is-flex fg-normal has-background-primary-1 has-border-left-primary is-size-small has-text-primary my-x-large p-normal has-radius-top-right-normal has-radius-bottom-right-normal'>
    <bal-icon color="primary" name="info" style={{marginTop: '2px'}}></bal-icon>
    <span>{children}</span>
  </div>
};

export const WarningQuote = ({ children }) => {
  return <div className='sb-unstyled is-flex fg-normal has-background-warning-1 has-border-left-warning is-size-small has-text-primary my-x-large p-normal has-radius-top-right-normal has-radius-bottom-right-normal'>
    <bal-icon color="warning-dark" name="alert-triangle" style={{marginTop: '2px'}}></bal-icon>
    <span>{children}</span>
  </div>
};
