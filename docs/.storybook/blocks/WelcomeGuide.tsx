import React from 'react'
import { LinkCard, LinkCards } from './Buttons'

export const WelcomeGuide = ({ _children }) => {
  return (
    <div className="sb-unstyled my-welcome-guide my-large">
      <LinkCards>
        <LinkCard
          pageTitle={'Development/Getting Started'}
          label={'Development'}
          description={'Getting Started with HTML, Angular or React'}
        />
        <LinkCard pageTitle={'Versions'} description={"What's new?"} />
        <LinkCard pageTitle={'Support'} description={'Ask a question, report a bug or request a feature'} />
        <LinkCard pageTitle={'Contributing'} description={'Be part of the Design System Community'} />
        <LinkCard
          label={'Architecture'}
          link={'https://github.com/baloise/design-system/blob/next/ARCHITECTURE.md'}
          description={'Why we built the Design System and how it works'}
        />
      </LinkCards>
    </div>
  )
}
