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
  /**
   * COLORS
   */
  color: {
    //
    // BASE
    'transparent': { hex: 'transparent', inverted: 'primary', description: descriptions.color.neutral },
    'white': { hex: '#ffffff', inverted: 'primary', description: descriptions.color.neutral },
    'black': { hex: '#000000', inverted: 'white', description: descriptions.color.neutral },
    //
    // GREY
    'grey-1': {
      hex: '#fafafa',
      inverted: 'primary',
      description: descriptions.color.neutral,
    },
    'grey-2': { hex: '#f6f6f6', inverted: 'primary', description: descriptions.color.neutral },
    'grey-3': { hex: '#e8e8e8', inverted: 'primary', description: descriptions.color.neutral },
    'grey-4': { hex: '#b6b6b6', inverted: 'primary', description: descriptions.color.neutral },
    'grey-5': { hex: '#747474', inverted: 'white', description: descriptions.color.neutral },
    'grey-6': { hex: '#313131', inverted: 'white', description: descriptions.color.neutral },
    //
    // BLUE
    'blue-1': { hex: '#e5e7f0', inverted: 'primary', description: descriptions.color.accent }, // blue -0.10
    'blue-2': { hex: '#b3b6d4', inverted: 'primary', description: descriptions.color.accent }, // #293485
    'blue-3': { hex: '#656ea8', inverted: 'primary', description: descriptions.color.accent },
    'blue-4': { hex: '#293485', inverted: 'white', description: descriptions.color.accent },
    'blue-5': { hex: '#000d6e', inverted: 'white', description: descriptions.color.accent },
    'blue-6': { hex: '#000739', inverted: 'white', description: descriptions.color.accent },
    //
    // LIGHT BLUE
    'light-blue-1': { hex: '#e5f1fe', inverted: 'primary', description: descriptions.color.functional }, // blue 3 70%
    'light-blue-2': { hex: '#a7d1fa', inverted: 'primary', description: descriptions.color.functional }, // blue 3
    'light-blue-3': { hex: '#56a7f5', inverted: 'primary', description: descriptions.color.functional },
    'light-blue-4': { hex: '#6672cc', inverted: 'white', description: descriptions.color.functional },
    'light-blue-5': { hex: '#0014aa', inverted: 'white', description: descriptions.color.functional }, // hover blue
    'light-blue-6': { hex: '#000a55', inverted: 'white', description: descriptions.color.functional },
    //
    // PURPLE
    'purple-1': { hex: '#f9f3ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-2': { hex: '#e1d9ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-3': { hex: '#b8b2ff', inverted: 'primary', description: descriptions.color.primary },
    'purple-4': { hex: '#be82fa', inverted: 'white', description: descriptions.color.primary },
    'purple-5': { hex: '#9f52cc', inverted: 'white', description: descriptions.color.primary },
    'purple-6': { hex: '#6c2273', inverted: 'white', description: descriptions.color.primary },
    //
    // GREEN
    'green-1': { hex: '#e9fbf7', inverted: 'primary', description: descriptions.color.primary },
    'green-2': { hex: '#cbf2ec', inverted: 'primary', description: descriptions.color.primary },
    'green-3': { hex: '#94e3d4', inverted: 'primary', description: descriptions.color.primary },
    'green-4': { hex: '#21d9ac', inverted: 'primary', description: descriptions.color.primary },
    'green-5': { hex: '#00b28f', inverted: 'primary', description: descriptions.color.primary },
    'green-6': { hex: '#1b5951', inverted: 'white', description: descriptions.color.primary },
    //
    // YELLOW / TANGERINE
    'yellow-1': { hex: '#fff9e8', inverted: 'primary', description: descriptions.color.primary },
    'yellow-2': { hex: '#ffecbc', inverted: 'primary', description: descriptions.color.primary },
    'yellow-3': { hex: '#fae052', inverted: 'primary', description: descriptions.color.primary },
    'yellow-4': { hex: '#ffbe19', inverted: 'primary', description: descriptions.color.primary },
    'yellow-5': { hex: '#fa9319', inverted: 'primary', description: descriptions.color.primary },
    'yellow-6': { hex: '#b24a00', inverted: 'white', description: descriptions.color.primary },
    //
    // RED
    'red-1': { hex: '#ffeef1', inverted: 'primary', description: descriptions.color.primary },
    'red-2': { hex: '#ffd7d7', inverted: 'primary', description: descriptions.color.primary },
    'red-3': { hex: '#ffaca6', inverted: 'primary', description: descriptions.color.primary },
    'red-4': { hex: '#ff596f', inverted: 'white', description: descriptions.color.primary },
    'red-5': { hex: '#d9304c', inverted: 'white', description: descriptions.color.primary },
    'red-6': { hex: '#99172d', inverted: 'white', description: descriptions.color.primary },
    //
    // INFO
    'info-1': { hex: '#e8f1fb', inverted: 'primary', description: descriptions.color.alert },
    'info-2': { hex: '#a4c9ed', inverted: 'primary', description: descriptions.color.alert },
    'info-3': { hex: '#60a0e0', inverted: 'white', description: descriptions.color.alert },
    'info-4': { hex: '#1c77d2', inverted: 'white', description: descriptions.color.alert },
    'info-5': { hex: '#155ba3', inverted: 'white', description: descriptions.color.alert },
    'info-6': { hex: '#0e457b', inverted: 'white', description: descriptions.color.alert },
    //
    // SUCCESS
    'success-1': { hex: '#e8f3ec', inverted: 'primary', description: descriptions.color.alert },
    'success-2': { hex: '#a1cfb3', inverted: 'primary', description: descriptions.color.alert },
    'success-3': { hex: '#5bab7a', inverted: 'white', description: descriptions.color.alert },
    'success-4': { hex: '#168741', inverted: 'white', description: descriptions.color.alert },
    'success-5': { hex: '#116b34', inverted: 'white', description: descriptions.color.alert },
    'success-6': { hex: '#0b5227', inverted: 'white', description: descriptions.color.alert },
    //
    // WARNING
    'warning-1': { hex: '#fff9e8', inverted: 'primary', description: descriptions.color.alert },
    'warning-2': { hex: '#ffe5a3', inverted: 'primary', description: descriptions.color.alert },
    'warning-3': { hex: '#ffd25e', inverted: 'primary', description: descriptions.color.alert },
    'warning-4': { hex: '#ffbe19', inverted: 'primary', description: descriptions.color.alert },
    'warning-5': { hex: '#f99319', inverted: 'primary', description: descriptions.color.alert },
    'warning-6': { hex: '#c97612', inverted: 'primary', description: descriptions.color.alert },
    //
    // DANGER
    'danger-1': { hex: '#fce8e6', inverted: 'primary', description: descriptions.color.alert },
    'danger-2': { hex: '#f7a299', inverted: 'primary', description: descriptions.color.alert },
    'danger-3': { hex: '#f05d4d', inverted: 'white', description: descriptions.color.alert },
    'danger-4': { hex: '#ea1800', inverted: 'white', description: descriptions.color.alert },
    'danger-5': { hex: '#cb1501', inverted: 'white', description: descriptions.color.alert },
    'danger-6': { hex: '#a01100', inverted: 'white', description: descriptions.color.alert },
  },
  breakpoint: {
    'tablet': '769px',
    'desktop': '1024px',
    'high-definition': '1280px',
    'widescreen': '1440px',
    'fullhd': '1920px',
  },
  container: {
    maxWidth: '1400px',
    size: {
      'detail-page': '744px',
      'compact': '896px',
      'normal': '1496px',
      'fluid': 'none',
    },
    space: {
      mobile: '1rem',
      tablet: '2.5rem',
      desktop: '3rem',
    },
  },
  radius: {
    none: { value: '0' },
    normal: { value: '0.25rem' },
    large: { value: '0.75rem' },
    rounded: { value: '9999px' },
  },
  shadow: {
    box: {
      none: { value: 'none' },
      normal: { value: '0 0 10px 0 rgba(0, 7, 57, 0.15)' },
      large: { value: '0 0 30px 0 rgba(0, 7, 57, 0.15)' },
    },
    text: {
      none: { value: 'none' },
      normal: {
        value: '0px 0px 4px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 80px rgba(0, 0, 0, 0.5)',
      },
    },
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
      description: 'Minimum space between two elements',
    },
    'x-small': {
      legacy: '2',
      mobile: '0.5rem',
      tablet: '0.5rem',
      desktop: '0.5rem',
      description: 'Space between text and icons or headings and content or clickable elements',
    },
    'small': {
      legacy: '3',
      mobile: '0.75rem',
      tablet: '0.75rem',
      desktop: '0.75rem',
      description: '',
    },
    'normal': {
      legacy: '4',
      mobile: '1rem',
      tablet: '1rem',
      desktop: '1rem',
      description: 'Space between large headings and content.',
    },
    'medium': {
      legacy: '5',
      mobile: '1.25rem',
      tablet: '1.25rem',
      desktop: '1.5rem',
      description: 'Inner padding of cards',
    },
    'large': {
      legacy: '6',
      mobile: '1.5rem',
      tablet: '1.5rem',
      desktop: '2rem',
      description: 'Space between cards',
    },
    'x-large': {
      legacy: '7',
      mobile: '2rem',
      tablet: '2.5rem',
      desktop: '3rem',
      description: 'Space between heading and card',
    },
    'xx-large': {
      legacy: '8',
      mobile: '3rem',
      tablet: '3.5rem',
      desktop: '4rem',
      description: '',
    },
    'xxx-large': {
      legacy: '9',
      mobile: '3.5rem',
      tablet: '4.5rem',
      desktop: '6rem',
      description: 'Footer bottom padding',
    },
    'xxxx-large': {
      legacy: '10',
      mobile: '4rem',
      tablet: '6rem',
      desktop: '8rem',
      description: 'Space between sections',
    },
  },
  typography: {
    familyTitle: 'BaloiseCreateHeadline, Arial, sans-serif',
    familyText: 'BaloiseCreateText, Arial, sans-serif',
    weights: {
      bold: '700',
      regular: '400',
      light: '300',
    },
    sizes: {
      'xxxxx-large': {
        figmaName: 'display',
        legacy: 'display',
        description: 'Should only be uses to illustrate large stage areas.',
        mobile: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: 'normal',
        },
        tablet: {
          fontSize: '5rem',
          lineHeight: '6rem',
          spacing: 'normal',
        },
        desktop: {
          fontSize: '5rem',
          lineHeight: '6rem',
          spacing: 'normal',
        },
      },
      'xxxx-large': {
        figmaName: 'display-2',
        legacy: 'display-2',
        description: 'Should only be uses to illustrate large stage areas.',
        mobile: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '3rem',
          lineHeight: '3.5rem',
          spacing: 'x-small',
        },
      },
      'xxx-large': {
        figmaName: 'h1',
        legacy: '1',
        description: 'Should only be used for stage titles and headings of level 1.',
        mobile: {
          fontSize: '1.75rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '2.5rem',
          lineHeight: '3rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '2.5rem',
          lineHeight: '3rem',
          spacing: 'x-small',
        },
      },
      'xx-large': {
        figmaName: 'h2',
        legacy: '2',
        description: 'Should only be used for content titles and headings of level 2.',
        mobile: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '2rem',
          lineHeight: '2.5rem',
          spacing: 'x-small',
        },
      },
      'x-large': {
        figmaName: 'h3',
        legacy: '3',
        description: "Should only be used for form titles, quick link navigation's and headings of level 3.",
        mobile: {
          fontSize: '1.25rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
      },
      'large': {
        figmaName: 'h4 / lead-text',
        legacy: '4',
        description:
          'Should only be used for standard card titles and headings of level 4 or for lead text/paragraphs after a heading',
        mobile: {
          fontSize: '1.125rem',
          lineHeight: '1.5rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '1.25rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '1.25rem',
          lineHeight: '2rem',
          spacing: 'x-small',
        },
      },
      'medium': {
        figmaName: 'block-text',
        legacy: '5',
        description: 'Should only be used in a 2/3 grid column to improve readability.',
        mobile: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: 'x-small',
        },
        tablet: {
          fontSize: '1.125rem',
          lineHeight: '1.625rem',
          spacing: 'x-small',
        },
        desktop: {
          fontSize: '1.125rem',
          lineHeight: '1.625rem',
          spacing: 'x-small',
        },
      },
      'normal': {
        figmaName: 'normal',
        legacy: '6',
        description: 'Should only be used for body texts and heading of level 5.',
        mobile: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: 'xx-small',
        },
        tablet: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: 'xx-small',
        },
        desktop: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          spacing: 'xx-small',
        },
      },
      'small': {
        figmaName: 'small-text',
        legacy: '7',
        description: 'Should only be used for label texts.',
        mobile: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: 'xx-small',
        },
        tablet: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: 'xx-small',
        },
        desktop: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          spacing: 'xx-small',
        },
      },
      'x-small': {
        figmaName: 'x-small-text',
        legacy: '8',
        description: 'Should only be used for helper texts or validation messages of a form control.',
        mobile: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: 'xx-small',
        },
        tablet: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: 'xx-small',
        },
        desktop: {
          fontSize: '0.75rem',
          lineHeight: '1rem',
          spacing: 'xx-small',
        },
      },
    },
    colors: {
      'primary': 'primary-5',
      'white': 'white',
      'black': 'black',
      'grey-dark': 'grey-6', // value of disabled inputs
      'grey': 'grey-5', // placeholder texts
      'grey-light': 'grey-4', // disabled texts
      'light-blue': 'light-blue-5', // hover color
      'light-blue-light': 'light-blue-2', // inverted hover color
      'info-light': 'info-3', // inverted active color
      'primary-dark': 'primary-6', // active color
      'primary-light': 'primary-3', // inverted disabled
      'success': 'success-4',
      'info': 'info-4',
      'warning': 'warning-5',
      'danger': 'danger-4',
      'danger-dark': 'danger-5', // hover color
      'danger-darker': 'danger-6', // active color
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
      'primary': 'primary-5',
      'grey-light': 'grey-2',
      'grey': 'grey-3',
      'grey-dark': 'grey-4',
      'warning': 'warning-5',
      'success': 'success-4',
      'danger': 'danger-4',
      'danger-dark': 'danger-5', // hover color
      'danger-darker': 'danger-6', // active color
      'primary-light': 'primary-3', // inverted disabled
      'white': 'white', // inverted
      'light-blue': 'light-blue-5', // hover color
      'primary-dark': 'primary-6', // active color
    },
  },
  /**
   * Animations tokens
   */
  animation: {
    transition: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.8, 0.5, 1)',
    },
  },
  /**
   * Z-index tokens
   */
  zIndex: {
    deep: { value: '-999999', description: 'Deep z-index is used to stack something behind everything else.' },
    default: { value: '1', description: 'The default z-index for components and elements inside components.' },
    masked: { value: '100', description: 'Default z-index for masked interface elements.' },
    mask: { value: '200', description: 'Default z-index for masking interface elements.' },
    sticky: { value: '300', description: 'Default z-index for sticky interface elements.' },
    navigation: { value: '400', description: 'Default z-index for navigation.' },
    popup: { value: '1000', description: 'Default z-index for popups that stacks on top of all other elements.' },
    modal: {
      value: '1100',
      description:
        'Default z-index for modals that stacks on top of overlays and other elements, but still allows popups to be visible.',
    },
    toast: { value: '1200', description: 'Default z-index for toast and snackbar messages.' },
    tooltip: { value: '1300', description: 'Default z-index for tooltips.' },
  },
} as BaloiseDesignTokens

/************************************************************
 * Aliases
 *
 ***********************************************************/
const colorAlias = (target: string, source: string) => {
  tokens.color[target] = {
    ...tokens.color[source],
    alias: source,
  }
}

colorAlias('primary-1', 'blue-1')
colorAlias('primary-2', 'blue-2')
colorAlias('primary-3', 'blue-3')
colorAlias('primary-4', 'blue-4')
colorAlias('primary-5', 'blue-5')
colorAlias('primary-6', 'blue-6')
colorAlias('primary', 'primary-5')
colorAlias('grey', 'grey-3')
colorAlias('blue', 'blue-5')
colorAlias('light-blue', 'light-blue-1')
colorAlias('purple', 'purple-3')
colorAlias('green', 'green-3')
colorAlias('yellow', 'yellow-3')
colorAlias('red', 'red-3')
colorAlias('info', 'info-3')
colorAlias('success', 'success-3')
colorAlias('warning', 'warning-3')
colorAlias('danger', 'danger-3')

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
  shadow: {
    box: BaloiseDesignTokenValues
    text: BaloiseDesignTokenValues
  }
  spacing: {
    [key: string]: {
      mobile: string
      tablet: string
      desktop: string
      alias?: string
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
        alias?: string
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
  hex: string
  description?: string
  inverted?: string
  rgba?: string
  alias?: string
}

export interface BaloiseDesignTokenValue {
  value: string
  description?: string
  deprecated?: boolean
}
