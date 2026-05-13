import type { Preset, Rule } from 'unocss'

import { flexRules, flexSafelist } from './rules/flex'
import { interactionRules, interactionSafelist } from './rules/interaction'
import { layoutRules, layoutSafelist } from './rules/layout'
import { sizingRules, sizingSafelist } from './rules/sizing'
import { spacingRules, spacingSafelist } from './rules/spacing'
import { responsiveVariants, pseudoVariants } from './variants/responsive'

export function presetDsUtilities(
  tokenSpacingRules: Rule[] = [],
  _tokenSpacingSafelist: string[] = [],
  bgRules: Rule[] = [],
  _bgSafelist: string[] = [],
  borderRules: Rule[] = [],
  _borderSafelist: string[] = [],
  borderColorRules: Rule[] = [],
  _borderColorSafelist: string[] = [],
  elevationRules: Rule[] = [],
  _elevationSafelist: string[] = [],
  typographyRules: Rule[] = [],
  typographyRawCSS: string = '',
): Preset {
  return {
    name: '@baloise/ds-css',
    rules: [
      ...tokenSpacingRules,
      ...spacingRules,
      ...flexRules,
      ...layoutRules,
      ...bgRules,
      ...borderRules,
      ...borderColorRules,
      ...elevationRules,
      ...interactionRules,
      ...sizingRules,
      ...typographyRules,
    ],
    variants: [...responsiveVariants, ...pseudoVariants],
    preflights: [
      // Pseudo-class text color variants need raw CSS because their selectors
      // can't be expressed as simple UnoCSS variant+rule combinations.
      {
        getCSS: () => typographyRawCSS,
      },
    ],
  }
}

export const allSafelist = (
  tokenSpacingSafelist: string[] = [],
  bgSafelist: string[] = [],
  borderSafelist: string[] = [],
  borderColorSafelist: string[] = [],
  elevationSafelist: string[] = [],
  typographySafelist: string[] = [],
): string[] => [
  ...tokenSpacingSafelist,
  ...spacingSafelist,
  ...flexSafelist,
  ...layoutSafelist,
  ...bgSafelist,
  ...borderSafelist,
  ...borderColorSafelist,
  ...elevationSafelist,
  ...interactionSafelist,
  ...sizingSafelist,
  ...typographySafelist,
]
