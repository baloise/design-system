/************************************************************
 * Design Tokens
 ***********************************************************/
const descriptions = {
  color: {
    alert: 'To draw attention to important information or actions we used our Alert colors palette.',
    functional:
      'These colors are a functional extension of the accent color and are meant to be used only for specific cases and situations.',
    neutral:
      "Neutral colors are typically used for text, borders and subtle backgrounds when we don't want to draw too much attention to a particular design element.",
    accent:
      'Blue is our accent color and it is present on every touchpoint. Our logo, text, buttons and links are blue.',
    primary:
      'Our primary colors play the main role in our brand identity. A vibrant set of fresh shades is the center point of the color palette. They are used to provide accessibility, simplicity, and consistency throughout all brand communications. They are used for Baloise Shapes, Illustrations, background colors and to highlight design elements.',
  },
}

const tokens = {
  color: {
    'white': { hex: '#ffffff', inverted: 'primary', description: descriptions.color.neutral },
    'black': { hex: '#000000', inverted: 'primary-inverted', description: descriptions.color.neutral },

    'grey-1': {
      hex: '#fafafa',
      inverted: 'primary',
      description: descriptions.color.neutral,
    },
    'grey-2': { hex: '#f6f6f6', inverted: 'primary', description: descriptions.color.neutral },
    'grey-3': { hex: '#e8e8e8', inverted: 'primary', description: descriptions.color.neutral },
    'grey-4': { hex: '#b6b6b6', inverted: 'primary', description: descriptions.color.neutral },
    'grey-5': { hex: '#747474', inverted: 'primary-inverted', description: descriptions.color.neutral },
    'grey-6': { hex: '#313131', inverted: 'primary-inverted', description: descriptions.color.neutral },

    'blue-1': { hex: '#e5e7f0', inverted: 'primary', description: descriptions.color.accent }, // blue -0.10
    'blue-2': { hex: '#b3b6d4', inverted: 'primary', description: descriptions.color.accent }, // #293485
    'blue-3': { hex: '#656ea8', inverted: 'primary', description: descriptions.color.accent },
    'blue-4': { hex: '#293485', inverted: 'primary-inverted', description: descriptions.color.accent },
    'blue-5': { hex: '#000d6e', inverted: 'primary-inverted', description: descriptions.color.accent },
    'blue-6': { hex: '#000739', inverted: 'primary-inverted', description: descriptions.color.accent },

    'light-blue-1': { hex: '#e5f1fe', inverted: 'primary', description: descriptions.color.functional }, // blue 3 70%
    'light-blue-2': { hex: '#a7d1fa', inverted: 'primary', description: descriptions.color.functional }, // blue 3
    'light-blue-3': { hex: '#56a7f5', inverted: 'primary', description: descriptions.color.functional },
    'light-blue-4': { hex: '#6672cc', inverted: 'primary-inverted', description: descriptions.color.functional },
    'light-blue-5': { hex: '#0014aa', inverted: 'primary-inverted', description: descriptions.color.functional }, // hover blue
    'light-blue-6': { hex: '#000a55', inverted: 'primary-inverted', description: descriptions.color.functional },

    'purple-1': { hex: '#f9f3ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-2': { hex: '#e1d9ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-3': { hex: '#b8b2ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-4': { hex: '#be82fa', inverted: 'primary-inverted', description: descriptions.color.primary },
    'purple-5': { hex: '#9f52cc', inverted: 'primary-inverted', description: descriptions.color.primary },
    'purple-6': { hex: '#6c2273', inverted: 'primary-inverted', description: descriptions.color.primary },

    'green-1': { hex: '#e9fbf7', inverted: 'primary', description: descriptions.color.primary },
    'green-2': { hex: '#cbf2ec', inverted: 'primary', description: descriptions.color.primary },
    'green-3': { hex: '#94e3d4', inverted: 'primary', description: descriptions.color.primary },
    'green-4': { hex: '#21d9ac', inverted: 'primary-inverted', description: descriptions.color.primary },
    'green-5': { hex: '#00b28f', inverted: 'primary-inverted', description: descriptions.color.primary },
    'green-6': { hex: '#1b5951', inverted: 'primary-inverted', description: descriptions.color.primary },

    'yellow-1': { hex: '#fff9e8', inverted: 'primary', description: descriptions.color.primary },
    'yellow-2': { hex: '#ffecbc', inverted: 'primary', description: descriptions.color.primary },
    'yellow-3': { hex: '#fae052', inverted: 'primary', description: descriptions.color.primary },
    'yellow-4': { hex: '#ffbe19', inverted: 'primary-inverted', description: descriptions.color.primary },
    'yellow-5': { hex: '#fa9319', inverted: 'primary-inverted', description: descriptions.color.primary },
    'yellow-6': { hex: '#b24a00', inverted: 'primary-inverted', description: descriptions.color.primary },

    'red-1': { hex: '#ffeef1', inverted: 'primary', description: descriptions.color.primary },
    'red-2': { hex: '#ffd7d7', inverted: 'primary', description: descriptions.color.primary },
    'red-3': { hex: '#ffaca6', inverted: 'primary', description: descriptions.color.primary },
    'red-4': { hex: '#ff596f', inverted: 'primary-inverted', description: descriptions.color.primary },
    'red-5': { hex: '#d9304c', inverted: 'primary-inverted', description: descriptions.color.primary },
    'red-6': { hex: '#99172d', inverted: 'primary-inverted', description: descriptions.color.primary },

    'info-1': { hex: '#e8f1fb', inverted: 'primary', description: descriptions.color.alert },
    'info-2': { hex: '#a4c9ed', inverted: 'primary', description: descriptions.color.alert },
    'info-3': { hex: '#60a0e0', inverted: 'primary', description: descriptions.color.alert },
    'info-4': { hex: '#1c77d2', inverted: 'primary-inverted', description: descriptions.color.alert },
    'info-5': { hex: '#155ba3', inverted: 'primary-inverted', description: descriptions.color.alert },
    'info-6': { hex: '#0e457b', inverted: 'primary-inverted', description: descriptions.color.alert },

    'success-1': { hex: '#e8f3ec', inverted: 'primary', description: descriptions.color.alert },
    'success-2': { hex: '#a1cfb3', inverted: 'primary', description: descriptions.color.alert },
    'success-3': { hex: '#5bab7a', inverted: 'primary', description: descriptions.color.alert },
    'success-4': { hex: '#168741', inverted: 'primary-inverted', description: descriptions.color.alert },
    'success-5': { hex: '#116b34', inverted: 'primary-inverted', description: descriptions.color.alert },
    'success-6': { hex: '#0b5227', inverted: 'primary-inverted', description: descriptions.color.alert },

    'warning-1': { hex: '#fff9e8', inverted: 'primary', description: descriptions.color.alert },
    'warning-2': { hex: '#ffe5a3', inverted: 'primary', description: descriptions.color.alert },
    'warning-3': { hex: '#ffd25e', inverted: 'primary', description: descriptions.color.alert },
    'warning-4': { hex: '#ffbe19', inverted: 'primary', description: descriptions.color.alert },
    'warning-5': { hex: '#f99319', inverted: 'primary-inverted', description: descriptions.color.alert },
    'warning-6': { hex: '#c97612', inverted: 'primary-inverted', description: descriptions.color.alert },

    'danger-1': { hex: '#fce8e6', inverted: 'primary', description: descriptions.color.alert },
    'danger-2': { hex: '#f7a299', inverted: 'primary', description: descriptions.color.alert },
    'danger-3': { hex: '#f05d4d', inverted: 'primary', description: descriptions.color.alert },
    'danger-4': { hex: '#ea1800', inverted: 'primary-inverted', description: descriptions.color.alert },
    'danger-5': { hex: '#cb1501', inverted: 'primary-inverted', description: descriptions.color.alert },
    'danger-6': { hex: '#a01100', inverted: 'primary-inverted', description: descriptions.color.alert },
  },
  breakpoint: {
    tablet: '769px',
    desktop: '1024px',
    widescreen: '1440px',
    fullhd: '1920px',
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
    'auto': {
      legacy: 'auto',
      mobile: 'auto',
      tablet: 'auto',
      desktop: 'auto',
    },
    'none': {
      legacy: '0',
      mobile: '0',
      tablet: '0',
      desktop: '0',
    },
    'xx-small': {
      legacy: '1',
      mobile: '0.25rem',
      tablet: '0.25rem',
      desktop: '0.25rem',
    },
    'x-small': {
      legacy: '2',
      mobile: '0.5rem',
      tablet: '0.5rem',
      desktop: '0.5rem',
    },
    'small': {
      legacy: '3',
      mobile: '0.7rem',
      tablet: '0.7rem',
      desktop: '0.7rem',
    },
    'normal': {
      legacy: '4',
      mobile: '1rem',
      tablet: '1rem',
      desktop: '1rem',
    },
    'medium': {
      legacy: '5',
      mobile: '1.25rem',
      tablet: '1.25rem',
      desktop: '1.5rem',
    },
    'large': {
      legacy: '6',
      mobile: '1.5rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
    'x-large': {
      legacy: '7',
      mobile: '2rem',
      tablet: '2.5rem',
      desktop: '3rem',
    },
    'xx-large': {
      legacy: '8',
      mobile: '3rem',
      tablet: '3.5rem',
      desktop: '4rem',
    },
    'xxx-large': {
      legacy: '9',
      mobile: '3.5rem',
      tablet: '4.5rem',
      desktop: '6rem',
    },
    'xxxx-large': {
      legacy: '10',
      mobile: '4rem',
      tablet: '6rem',
      desktop: '8rem',
    },
  },
  typography: {
    familyTitle: 'BaloiseCreateHeadline, Arial, sans-serif',
    familyText: 'BaloiseCreateText, Arial, sans-serif',
    weights: {
      bold: 700,
      regular: 400,
      light: 300,
    },
    sizes: {
      'xxxxx-large': {
        figmaName: 'display',
        description: 'Should only be uses to illustrate large stage areas.',
        mobile: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '4',
        },
        tablet: {
          fontSize: '5rem',
          lineHeight: '6rem',
          spacing: '4',
        },
        desktop: {
          fontSize: '5rem',
          lineHeight: '6rem',
          spacing: '4',
        },
      },
      'xxxx-large': {
        figmaName: 'h1',
        description: 'Should only be used for stage titles and headings of level 1.',
        mobile: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: '2',
        },
      },
      'xxx-large': {
        figmaName: 'h2',
        description: 'Should only be used for content titles and headings of level 2.',
        mobile: {
          fontSize: '1.75rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '2.5rem',
          lineHeight: '3rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '2.5rem',
          lineHeight: '3rem',
          spacing: '2',
        },
      },
      'xx-large': {
        figmaName: 'h3',
        description: "Should only be used for form titles, quick link navigation's and headings of level 3.",
        mobile: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: '2',
        },
      },
      'x-large': {
        figmaName: 'h4',
        description: 'Should only be used for standard card titles and headings of level 4.',
        mobile: {
          fontSize: '1.25rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: '2',
        },
      },
      'large': {
        figmaName: 'lead-text',
        description: 'Should only be used for lead text/paragraphs after a heading.',
        mobile: {
          fontSize: '1.125rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '1.125rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '1.25rem',
          lineHeight: '2rem',
          spacing: '2',
        },
      },
      'medium': {
        figmaName: 'block-text',
        description: 'Should only be used in a 2/3 grid column to improve readability.',
        mobile: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: '2',
        },
        tablet: {
          fontSize: '1.125rem',
          lineHeight: '2rem',
          spacing: '2',
        },
        desktop: {
          fontSize: '1.125rem',
          lineHeight: '2rem',
          spacing: '2',
        },
      },
      'normal': {
        figmaName: 'normal',
        description: 'Should only be used for body texts and heading of level 5.',
        mobile: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: '1',
        },
        tablet: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: '1',
        },
        desktop: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: '1',
        },
      },
      'small': {
        figmaName: 'small-text',
        description: 'Should only be used for label texts.',
        mobile: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: '1',
        },
        tablet: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: '1',
        },
        desktop: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: '1',
        },
      },
      'x-small': {
        figmaName: 'x-small-text',
        description: 'Should only be used for helper texts or validation messages of a form control.',
        mobile: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: '1',
        },
        tablet: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: '1',
        },
        desktop: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: '1',
        },
      },
    },
    colors: {
      'primary': 'primary',
      'blue': 'blue',
      'black': 'black',
      'normal': 'blue',
      'light-blue': 'light-blue-5',
      'hover': 'light-blue-5',
      'blue-dark': 'blue-6',
      'active': 'blue-6',
      'white': 'white',
      'blue-light': 'blue-3',
      'hint': 'primary-3',
      'help': 'primary-3',
      'success': 'success-4',
      'valid': 'success-4',
      'danger': 'danger-4',
      'invalid': 'danger-4',
      'warning': 'warning-5',
      'grey': 'grey-5',
      'disabled': 'grey-5',
    },
  },
  /**
   * Internal tokens
   */
  grid: {
    gap: '1rem',
  },
  border: {
    width: '2px',
    colors: {
      primary: 'primary',
      active: 'primary',
      normal: 'grey-3',
      hover: 'grey-3',
      disabled: 'grey-3',
      warning: 'warning-5',
      success: 'success-4',
      danger: 'danger-4',
      valid: 'success-4',
      invalid: 'danger-4',
    },
  },
} as BaloiseDesignTokens

/************************************************************
 * Aliases
 *
 ***********************************************************/
tokens.color['primary-1'] = tokens.color['blue-1']
tokens.color['primary-2'] = tokens.color['blue-2']
tokens.color['primary-3'] = tokens.color['blue-3']
tokens.color['primary-4'] = tokens.color['blue-4']
tokens.color['primary-5'] = tokens.color['blue-5']
tokens.color['primary-6'] = tokens.color['blue-6']

tokens.color['primary'] = tokens.color['primary-5']
tokens.color['primary-inverted'] = tokens.color['white']
tokens.color['primary-light'] = tokens.color['primary-1']
tokens.color['primary-dark'] = tokens.color['primary-6']

tokens.color['grey-light'] = tokens.color['grey-1']
tokens.color['grey-dark'] = tokens.color['grey-5']
tokens.color['grey'] = tokens.color['grey-3']

tokens.color['blue-light'] = tokens.color['blue-1']
tokens.color['blue-dark'] = tokens.color['blue-6']
tokens.color['blue'] = tokens.color['blue-5']

tokens.color['primary-hover'] = tokens.color['light-blue-5']
tokens.color['primary-active'] = tokens.color['primary-6']

tokens.color['light-blue'] = tokens.color['light-blue-1']
tokens.color['light-blue-dark'] = tokens.color['light-blue-5']
tokens.color['light-blue-hover'] = tokens.color['light-blue-1']
tokens.color['light-blue-active'] = tokens.color['light-blue-1']

tokens.color['purple-light'] = tokens.color['purple-1']
tokens.color['purple-dark'] = tokens.color['purple-6']
tokens.color['purple'] = tokens.color['purple-3']

tokens.color['green-light'] = tokens.color['green-1']
tokens.color['green-dark'] = tokens.color['green-6']
tokens.color['green'] = tokens.color['green-3']

tokens.color['yellow-light'] = tokens.color['yellow-1']
tokens.color['yellow-dark'] = tokens.color['yellow-6']
tokens.color['yellow'] = tokens.color['yellow-3']

tokens.color['red-light'] = tokens.color['red-1']
tokens.color['red-dark'] = tokens.color['red-6']
tokens.color['red'] = tokens.color['red-3']

tokens.color['info-light'] = tokens.color['info-1']
tokens.color['info'] = tokens.color['info-3']
tokens.color['info-dark'] = tokens.color['info-6']

tokens.color['success-light'] = tokens.color['success-1']
tokens.color['success'] = tokens.color['success-3']
tokens.color['success-dark'] = tokens.color['success-6']

tokens.color['warning-light'] = tokens.color['warning-1']
tokens.color['warning'] = tokens.color['warning-3']
tokens.color['warning-dark'] = tokens.color['warning-6']

tokens.color['danger-light'] = tokens.color['danger-1']
tokens.color['danger'] = tokens.color['danger-3']
tokens.color['danger-dark'] = tokens.color['danger-6']

tokens.color['valid'] = tokens.color['success-light']
tokens.color['invalid'] = tokens.color['danger-light']
tokens.color['disabled'] = tokens.color['grey-2']

tokens.color['background'] = tokens.color['white']
tokens.color['background-light'] = tokens.color['grey-light']

//
// Legacy
tokens.typography.sizes['display'] = tokens.typography.sizes['xxxxx-large']
tokens.typography.sizes['1'] = tokens.typography.sizes['xxxx-large']
tokens.typography.sizes['2'] = tokens.typography.sizes['xxx-large']
tokens.typography.sizes['3'] = tokens.typography.sizes['xx-large']
tokens.typography.sizes['4'] = tokens.typography.sizes['x-large']
tokens.typography.sizes['5'] = tokens.typography.sizes['normal']
tokens.typography.sizes['6'] = tokens.typography.sizes['small']
tokens.typography.sizes['7'] = tokens.typography.sizes['x-small']

tokens.spacing['0'] = tokens.spacing['none']
tokens.spacing['1'] = tokens.spacing['xx-small']
tokens.spacing['2'] = tokens.spacing['x-small']
tokens.spacing['3'] = tokens.spacing['small']
tokens.spacing['4'] = tokens.spacing['normal']
tokens.spacing['5'] = tokens.spacing['medium']
tokens.spacing['6'] = tokens.spacing['large']
tokens.spacing['7'] = tokens.spacing['x-large']
tokens.spacing['8'] = tokens.spacing['xx-large']
tokens.spacing['9'] = tokens.spacing['xxx-large']
tokens.spacing['10'] = tokens.spacing['xxxx-large']

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
    [key: string]: {
      mobile: string
      tablet: string
      desktop: string
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
    colors: {
      [key: string]: string
    }
    sizes: {
      [key: string]: {
        mobile: {
          fontSize: string
          lineHeight: string
          spacing: string
        }
        tablet: {
          fontSize: string
          lineHeight: string
          spacing: string
        }
        desktop: {
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
  inverted?: string
  rgba?: string
  hex: string
}

export interface BaloiseDesignTokenValue {
  description?: string
  value: string
}
