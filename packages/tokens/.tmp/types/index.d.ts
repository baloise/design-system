/************************************************************
 * Export
 ***********************************************************/
export declare const BaloiseDesignToken: BaloiseDesignTokens
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
  description?: string
  value: string
}
