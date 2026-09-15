import type { VariantObject } from 'unocss'

interface BreakpointDef {
  min?: string
  max?: string
}

const breakpoints: Record<string, BreakpointDef> = {
  'mobile': { max: '768px' },
  'tablet': { min: '769px' },
  'tablet-only': { min: '769px', max: '1023px' },
  'touch': { max: '1023px' },
  'desktop': { min: '1024px' },
  'desktop-only': { min: '1024px', max: '1279px' },
  'desktop-lg': { min: '1280px' },
  'desktop-xl': { min: '1440px' },
  'desktop-2xl': { min: '1920px' },
}

function mediaQuery({ min, max }: BreakpointDef): string {
  if (min && max) return `screen and (min-width: ${min}) and (max-width: ${max})`
  if (min) return `screen and (min-width: ${min})`
  return `screen and (max-width: ${max})`
}

export const responsiveVariants: VariantObject[] = Object.entries(breakpoints).map(([name, def]) => ({
  name: `breakpoint-${name}`,
  match(matcher: string) {
    const prefix = `${name}:`
    if (!matcher.startsWith(prefix)) return
    return {
      matcher: matcher.slice(prefix.length),
      handle: (input, next) =>
        next({
          ...input,
          parent: `${input.parent ? `${input.parent} ` : ''}@media ${mediaQuery(def)}`,
        }),
    }
  },
  autocomplete: `${name}:`,
}))

// Pseudo-class variants: hover:, focus:, active:
export const pseudoVariants: VariantObject[] = [
  { pseudo: ':hover:not(:active)', prefix: 'hover' },
  { pseudo: ':focus', prefix: 'focus' },
  { pseudo: ':active', prefix: 'active' },
].map(({ pseudo, prefix }) => ({
  name: `pseudo-${prefix}`,
  match(matcher: string) {
    const p = `${prefix}:`
    if (!matcher.startsWith(p)) return
    return {
      matcher: matcher.slice(p.length),
      selector: (s: string) => `${s}${pseudo}`,
    }
  },
  autocomplete: `${prefix}:`,
}))
