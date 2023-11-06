import React from 'react'
import { LinkCard, LinkCards } from '../'

export const WelcomeGuide = ({ children }) => {
  return (
    <div className="sb-unstyled my-welcome-guide my-large">
      <LinkCards>
        <LinkCard
          pageTitle={'Design System'}
          label={'What is a Design System?'}
          description={'Purpose, advantages and architecture'}
        />
        <LinkCard
          pageTitle={'Foundation/Iconography'}
          label={'Iconography'}
          description={'Introducing a collection of up to 100 vector graphics'}
        />
        <LinkCard
          pageTitle={'Development/Getting Started'}
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
