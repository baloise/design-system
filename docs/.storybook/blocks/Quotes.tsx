import React from 'react';

export const InfoQuote = ({ children }) => {
  return <div className='sb-unstyled flex gap-normal bg-grey-2 border-left-primary text-small text-primary my-medium p-normal radius-right-normal'>
    <bal-icon color="primary" name="info" style={{marginTop: '2px'}}></bal-icon>
    <span>{children}</span>
  </div>
};

export const WarningQuote = ({ children }) => {
  return <div className='sb-unstyled flex gap-normal bg-warning-1 border-left-warning text-small text-primary my-medium p-normal radius-right-normal'>
    <bal-icon color="warning-dark" name="alert-triangle" style={{marginTop: '2px'}}></bal-icon>
    <span>{children}</span>
  </div>
};
