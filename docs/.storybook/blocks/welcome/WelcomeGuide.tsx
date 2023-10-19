import React from 'react'
import { LinkCard, LinkCards } from '../'

export const WelcomeGuide = ({ children }) => {
  return (
    <div className="sb-unstyled my-welcome-guide">
      <LinkCards>
        <LinkCard
          pageTitle={'Design System'}
          label={'What is a Design System?'}
          description={'Purpose, advantages and architecture'}
        />
        <LinkCard
          pageTitle={'Foundation/Overview'}
          label={'Foundation'}
          description={'Design tokens, typography, colors and more'}
        />
        <LinkCard
          pageTitle={'Development/Overview'}
          label={'Development'}
          description={'Getting Started with HTML, Angular, React or Vue.js'}
        />
        <LinkCard pageTitle={'Changelog'} description={"What's new?"} />
        <LinkCard pageTitle={'Support'} description={'Ask a question, report a bug or request a feature'} />
        <LinkCard pageTitle={'Contributing'} description={'Be part of the Design System Community'} />
      </LinkCards>
    </div>
  )
}
