
import React from 'react';

export const WelcomeGuide = ({children}) => {
  return <div className='my-welcome-guides sb-unstyled' style={{maxWidth: '420px'}}>
  <bal-list border>
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/design-system--page">
        <bal-list-item-content>
          <bal-list-item-title>What is a Design System?</bal-list-item-title>
          <bal-list-item-subtitle>Purpose, advantages and architecture</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
    {/* ----------- DIVIDER ----------- */}
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/foundation-overview--page">
        <bal-list-item-content>
          <bal-list-item-title>Foundations</bal-list-item-title>
          <bal-list-item-subtitle>Design tokens, typography, colors and more</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
    {/* ----------- DIVIDER ----------- */}
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/development-getting-started--page">
        <bal-list-item-content>
          <bal-list-item-title>Development</bal-list-item-title>
          <bal-list-item-subtitle>
            Getting Started with HTML, Angular, React or Vue.js
          </bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
    {/* ----------- DIVIDER ----------- */}
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/changelog--page">
        <bal-list-item-content>
          <bal-list-item-title>Changelog</bal-list-item-title>
          <bal-list-item-subtitle>What's new?</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
    {/* ----------- DIVIDER ----------- */}
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/support--page">
        <bal-list-item-content>
          <bal-list-item-title>Support</bal-list-item-title>
          <bal-list-item-subtitle>Ask a question, report a bug or request a feature</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
    {/* ----------- DIVIDER ----------- */}
    <div className="bal-list__item">
      <a className="bal-list__item__trigger" href="?path=/docs/contributing--page">
        <bal-list-item-content>
          <bal-list-item-title>Contributing</bal-list-item-title>
          <bal-list-item-subtitle>Be part of the Design System Community</bal-list-item-subtitle>
        </bal-list-item-content>
        <bal-list-item-icon right>
          <bal-icon name="nav-go-right" size="x-small"></bal-icon>
        </bal-list-item-icon>
      </a>
    </div>
  </bal-list>
  </div>
};

