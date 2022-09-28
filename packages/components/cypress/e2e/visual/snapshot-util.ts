import { Platforms } from '../../../dist/types'

export const platformDimensions = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 769,
    height: 1024,
  },
  desktop: {
    width: 1024,
    height: 1280,
  },
  highDefinition: {
    width: 1280,
    height: 1440,
  },
  widescreen: {
    width: 1440,
    height: 1920,
  },
  fullhd: {
    width: 1920,
    height: 1920,
  },
}

export const compareSnapshotOptions = (platform: Platforms, x = 0, y = 0) => ({
  errorThreshold: 0.0,
  clip: {
    x,
    y,
    ...platformDimensions[platform],
  },
})
