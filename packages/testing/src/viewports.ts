import { Platforms } from './commands/helpers'

type Viewport = {
  [key in Platforms]: Cypress.Dimensions
}

export const balViewport: Viewport = {
  mobile: {
    width: 375,
    height: 667,
    x: 0,
    y: 0,
  },
  tablet: {
    width: 769,
    height: 1024,
    x: 0,
    y: 0,
  },
  touch: {
    width: 769,
    height: 1024,
    x: 0,
    y: 0,
  },
  desktop: {
    width: 1024,
    height: 1280,
    x: 0,
    y: 0,
  },
  highDefinition: {
    width: 1280,
    height: 1440,
    x: 0,
    y: 0,
  },
  widescreen: {
    width: 1440,
    height: 1920,
    x: 0,
    y: 0,
  },
  fullhd: {
    width: 1920,
    height: 1920,
    x: 0,
    y: 0,
  },
}
