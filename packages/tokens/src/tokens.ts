export interface BaloiseDesignTokens {
  color: BaloiseDesignTokenColors
  breakpoint: {
    tablet: string
    desktop: string
  }
  radius: BaloiseDesignTokenValues
  shadow: BaloiseDesignTokenValues
  // shadow: {
  //   none: BaloiseDesignTokenValue
  //   normal: BaloiseDesignTokenValue
  // }
  // border: {
  //   width: string
  // }
}

export interface BaloiseDesignTokenValues {
  [key: string]: BaloiseDesignTokenValue
}

export interface BaloiseDesignTokenColors {
  [key: string]: BaloiseDesignTokenColor
}

export interface BaloiseDesignTokenColor {
  description?: string
  rgba?: string
  hex: string
}

export interface BaloiseDesignTokenValue {
  description?: string
  value: string
}

const tokens = {
  color: {
    'white': { hex: '#ffffff' },
    'blue-0': { hex: '#e5e7f0' },
    'blue-1': { hex: '#cccfe2' },
    'blue-2': { hex: '#b3b6d4' },
    'blue-3': { hex: '#999ec5' },
    'blue-4': { hex: '#8086b7' },
    'blue-5': { hex: '#666ea8' },
    'blue-6': { hex: '#333d8b' },
    'blue-7': { hex: '#000d6e' },
    'blue-8': { hex: '#00094d' },
    'blue-9': { hex: '#000739' },
  },
  breakpoint: {
    tablet: '769px',
    desktop: '1024px',
  },
  radius: {
    none: { value: '0' },
    small: { value: '4px' },
    normal: { value: '4px' },
    large: { value: '12px' },
    rounded: { value: '9999px' },
  },
  shadow: {
    none: { value: 'none' },
    normal: { value: '0px 5px 15px rgba(0, 0, 0, 0.1)' },
    large: { value: '0px 5px 15px rgba(0, 0, 0, 0.1)' }, // TODO: add large shadow for hover effect
  },
} as BaloiseDesignTokens

// aliases
tokens.color.blue = tokens.color['blue-7']

export const BaloiseDesignToken = tokens
