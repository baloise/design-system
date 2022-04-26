/************************************************************
 * Design Tokens
 ***********************************************************/
const tokens = {
  grid: {
    gap: '1rem',
  },
  color: {
    'white': { hex: '#ffffff' },
    'black': { hex: '#000000' },

    'grey-0': { hex: '#fafafa' },
    'grey-1': { hex: '#f6f6f6' },
    'grey-2': { hex: '#e8e8e8' },
    'grey-3': { hex: '#d1d1d1' },
    'grey-4': { hex: '#b6b6b6' },
    'grey-5': { hex: '#a4a4a4' },
    'grey-6': { hex: '#909090' },
    'grey-7': { hex: '#747474' },
    'grey-8': { hex: '#313131' },
    'grey-9': { hex: '#171717' },

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

    'light-blue-0': { hex: '#e7f2fe' },
    'light-blue-1': { hex: '#b7d9fb' },
    'light-blue-2': { hex: '#a7d1fa' },
    'light-blue-3': { hex: '#86c0f8' },
    'light-blue-4': { hex: '#56a7f5' },
    'light-blue-5': { hex: '#6672cc' },
    'light-blue-6': { hex: '#3343bb' },
    'light-blue-7': { hex: '#0014aa' },
    'light-blue-8': { hex: '#001088' },
    'light-blue-9': { hex: '#000a55' },

    'purple-0': { hex: '#f9f3ff' },
    'purple-1': { hex: '#f9f3ff' },
    'purple-2': { hex: '#e1d9ff' },
    'purple-3': { hex: '#b8b2ff' },
    'purple-4': { hex: '#be82fa' },
    'purple-5': { hex: '#9f52cc' },
    'purple-6': { hex: '#6c2273' },
    'purple-7': { hex: '#6c2273' },
    'purple-8': { hex: '#6c2273' },
    'purple-9': { hex: '#6c2273' },

    'green-0': { hex: '#e9fbf7' },
    'green-1': { hex: '#e9fbf7' },
    'green-2': { hex: '#cbf2ec' },
    'green-3': { hex: '#94e3d4' },
    'green-4': { hex: '#21d9ac' },
    'green-5': { hex: '#00b28f' },
    'green-6': { hex: '#1b5951' },
    'green-7': { hex: '#1b5951' },
    'green-8': { hex: '#1b5951' },
    'green-9': { hex: '#1b5951' },

    'yellow-0': { hex: '#fff9e8' },
    'yellow-1': { hex: '#fff9e8' },
    'yellow-2': { hex: '#ffecbc' },
    'yellow-3': { hex: '#fae052' },
    'yellow-4': { hex: '#ffbe19' },
    'yellow-5': { hex: '#fa9319' },
    'yellow-6': { hex: '#b24a00' },
    'yellow-7': { hex: '#b24a00' },
    'yellow-8': { hex: '#b24a00' },
    'yellow-9': { hex: '#b24a00' },

    'red-0': { hex: '#ffeef1' },
    'red-1': { hex: '#ffeef1' },
    'red-2': { hex: '#ffd7d7' },
    'red-3': { hex: '#ffaca6' },
    'red-4': { hex: '#ff596f' },
    'red-5': { hex: '#d9304c' },
    'red-6': { hex: '#99172d' },
    'red-7': { hex: '#99172d' },
    'red-8': { hex: '#99172d' },
    'red-9': { hex: '#99172d' },

    'info-0': { hex: '#ebf1f7' },
    'info-1': { hex: '#c4d6e8' },
    'info-2': { hex: '#9dbad8' },
    'info-3': { hex: '#89add1' },
    'info-4': { hex: '#6291c2' },
    'info-5': { hex: '#4f84ba' },
    'info-6': { hex: '#2869ab' },
    'info-7': { hex: '#145ba3' },
    'info-8': { hex: '#0f447a' },
    'info-9': { hex: '#0a2e52' },

    'success-0': { hex: '#d7e6dc' },
    'success-1': { hex: '#c3dacc' },
    'success-2': { hex: '#afcdbb' },
    'success-3': { hex: '#9bc1aa' },
    'success-4': { hex: '#88b599' },
    'success-5': { hex: '#609c77' },
    'success-6': { hex: '#398456' },
    'success-7': { hex: '#116b34' },
    'success-8': { hex: '#0d5027' },
    'success-9': { hex: '#09361a' },

    'warning-0': { hex: '#feedd8' },
    'warning-1': { hex: '#fddbb2' },
    'warning-2': { hex: '#fcc98c' },
    'warning-3': { hex: '#fcb765' },
    'warning-4': { hex: '#fba53f' },
    'warning-5': { hex: '#fa9319' },
    'warning-6': { hex: '#d17b15' },
    'warning-7': { hex: '#a76211' },
    'warning-8': { hex: '#7e4a0d' },
    'warning-9': { hex: '#543108' },

    'danger-0': { hex: '#faebe9' },
    'danger-1': { hex: '#f2c4be' },
    'danger-2': { hex: '#e99d94' },
    'danger-3': { hex: '#e58a7f' },
    'danger-4': { hex: '#e1766a' },
    'danger-5': { hex: '#dc6355' },
    'danger-6': { hex: '#d43c2a' },
    'danger-7': { hex: '#cb1500' },
    'danger-8': { hex: '#981000' },
    'danger-9': { hex: '#660b00' },
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
    normal: { value: '0 0 10px 0 rgba(0, 7, 57, 0.15)' },
    large: { value: '0 0 30px 0 rgba(0, 7, 57, 0.15)' },
  },
  spacing: {
    mobile: {
      'auto': 'auto',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.7rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '2rem',
      '8': '3rem',
    },
    tablet: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.7rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '2.5rem',
      '8': '3.5rem',
    },
    desktop: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.7rem',
      '4': '1rem',
      '5': '1.5rem',
      '6': '2rem',
      '7': '3rem',
      '8': '4rem',
    },
  },
  border: {
    width: '2px',
    colors: {
      blue: 'blue',
      normal: 'grey-2',
      hover: 'grey-2',
      active: 'blue',
      valid: 'success-4',
      invalid: 'danger-4',
      disabled: 'grey-2',
    },
  },
  typography: {
    familyTitle: 'BaloiseCreateHeadline, Arial, sans-serif',
    familyText: 'BaloiseCreateText, Arial, sans-serif',
    sizes: {
      mobile: {
        'display-1': {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '3',
        },
        'display-2': {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '3',
        },
        '1': {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: '3',
        },
        '2': {
          fontSize: '1.75rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        '3': {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        '4': {
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
          spacing: '2',
        },
        '5': {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: '2',
        },
        '6': {
          fontSize: '0.875rem',
          lineHeight: '1rem',
          spacing: '1',
        },
        '7': {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: '1',
        },
      },
      tablet: {
        'display-1': {
          fontSize: '5rem',
          lineHeight: '6rem',
          spacing: '3',
        },
        'display-2': {
          fontSize: '3.5rem',
          lineHeight: '4rem',
          spacing: '3',
        },
        '1': {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '2',
        },
        '2': {
          fontSize: '2.5rem',
          lineHeight: '3rem',
          spacing: '2',
        },
        '3': {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: '2',
        },
        '4': {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: '2',
        },
      },
      desktop: {},
    },
  },
} as BaloiseDesignTokens

/************************************************************
 * Aliases
 ***********************************************************/
tokens.color['grey-light'] = tokens.color['grey-0']
tokens.color['grey'] = tokens.color['grey-3']
tokens.color['grey-dark'] = tokens.color['grey-5']
tokens.color['grey-text'] = tokens.color['grey-7']

tokens.color['blue-light'] = tokens.color['blue-0']
tokens.color['blue'] = tokens.color['blue-7']
tokens.color['blue-dark'] = tokens.color['blue-9']
tokens.color['blue-text-light'] = tokens.color['blue-5']
tokens.color['blue-text'] = tokens.color['blue-7']

tokens.color['light-blue-light'] = tokens.color['light-blue-0']
tokens.color['light-blue'] = tokens.color['light-blue-2']
tokens.color['light-blue-dark'] = tokens.color['light-blue-7']

tokens.color['purple-light'] = tokens.color['purple-1']
tokens.color['purple'] = tokens.color['purple-3']
tokens.color['purple-dark'] = tokens.color['purple-6']
tokens.color['purple-text'] = tokens.color['purple-6']

tokens.color['green-light'] = tokens.color['green-1']
tokens.color['green'] = tokens.color['green-3']
tokens.color['green-dark'] = tokens.color['green-6']
tokens.color['green-text'] = tokens.color['green-6']

tokens.color['yellow-light'] = tokens.color['yellow-1']
tokens.color['yellow'] = tokens.color['yellow-3']
tokens.color['yellow-dark'] = tokens.color['yellow-6']
tokens.color['yellow-text'] = tokens.color['yellow-6']

tokens.color['red-light'] = tokens.color['red-1']
tokens.color['red'] = tokens.color['red-3']
tokens.color['red-dark'] = tokens.color['red-6']
tokens.color['red-text'] = tokens.color['red-6']

tokens.color['primary-0'] = tokens.color['blue-0']
tokens.color['primary-1'] = tokens.color['blue-1']
tokens.color['primary-2'] = tokens.color['blue-2']
tokens.color['primary-3'] = tokens.color['blue-3']
tokens.color['primary-4'] = tokens.color['blue-4']
tokens.color['primary-5'] = tokens.color['blue-5']
tokens.color['primary-6'] = tokens.color['blue-6']
tokens.color['primary-7'] = tokens.color['blue-7']
tokens.color['primary-8'] = tokens.color['blue-8']
tokens.color['primary-9'] = tokens.color['blue-9']
tokens.color['primary-light'] = tokens.color['blue-0']
tokens.color['primary'] = tokens.color['blue-7']
tokens.color['primary-dark'] = tokens.color['blue-9']
tokens.color['primary-text-light'] = tokens.color['blue-5']
tokens.color['primary-text'] = tokens.color['blue-7']

tokens.color['info-light'] = tokens.color['info-1']
tokens.color['info'] = tokens.color['info-3']
tokens.color['info-dark'] = tokens.color['info-6']
tokens.color['info-text'] = tokens.color['info-6']

tokens.color['success-light'] = tokens.color['success-1']
tokens.color['success'] = tokens.color['success-3']
tokens.color['success-dark'] = tokens.color['success-6']
tokens.color['success-text'] = tokens.color['success-6']

tokens.color['warning-light'] = tokens.color['warning-1']
tokens.color['warning'] = tokens.color['warning-3']
tokens.color['warning-dark'] = tokens.color['warning-6']
tokens.color['warning-text'] = tokens.color['warning-6']

tokens.color['danger-light'] = tokens.color['danger-1']
tokens.color['danger'] = tokens.color['danger-3']
tokens.color['danger-dark'] = tokens.color['danger-6']
tokens.color['danger-text'] = tokens.color['danger-6']

tokens.color['valid'] = tokens.color['success-1']
tokens.color['invalid'] = tokens.color['danger-1']
tokens.color['disabled'] = tokens.color['grey-2']

tokens.typography.sizes.mobile['large'] = tokens.typography.sizes.mobile['3']
tokens.typography.sizes.mobile['medium'] = tokens.typography.sizes.mobile['4']
tokens.typography.sizes.mobile['normal'] = tokens.typography.sizes.mobile['5']
tokens.typography.sizes.mobile['small'] = tokens.typography.sizes.mobile['6']
tokens.typography.sizes.tablet['large'] = tokens.typography.sizes.tablet['3']
tokens.typography.sizes.tablet['medium'] = tokens.typography.sizes.tablet['4']

/************************************************************
 * Export
 ***********************************************************/
export const BaloiseDesignToken = tokens

/************************************************************
 * Types
 ***********************************************************/
export interface BaloiseDesignTokens {
  grid: {
    gap: string
  }
  color: BaloiseDesignTokenColors
  breakpoint: {
    tablet: string
    desktop: string
  }
  radius: BaloiseDesignTokenValues
  shadow: BaloiseDesignTokenValues
  spacing: {
    mobile: {
      [key: string]: string
    }
    tablet: {
      [key: string]: string
    }
    desktop: {
      [key: string]: string
    }
  }
  border: {
    width: string
    colors: {
      [key: string]: string
    }
  }
  typography: {
    familyTitle: string
    familyText: string
    sizes: {
      mobile: {
        [key: string]: {
          fontSize: string
          lineHeight: string
          spacing: string
        }
      }
      tablet: {
        [key: string]: {
          fontSize: string
          lineHeight: string
          spacing: string
        }
      }
      desktop: {
        [key: string]: {
          fontSize: string
          lineHeight: string
          spacing: string
        }
      }
    }
  }
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
