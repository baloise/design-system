import { Config } from 'style-dictionary'

const basePxFontSize = 16
const mode = 'Base'

const config: Config = {
  source: [`tokens/${mode}.tokens.json`],
  platforms: {
    css: {
      // No transformGroup — the 'css' transformGroup's built-in 'shadow/css/shorthand' renders
      // shadow colors as 'rgb(0% 0% 0% / 0.25)' (colorjs.io's default), not this codebase's
      // '#hex'/'rgba(...)' convention (verified directly — see
      // docs/plans/shadow-token-type-plan.md). Listed explicitly instead: every other 'css'
      // transformGroup member is kept verbatim (so nothing else about this platform's output
      // changes) — including 'fontFamily/css', which already produces correct output and is why
      // there's no separate 'ds/font-family' transform anywhere — except 'shadow/css/shorthand',
      // swapped for our own 'ds/shadow', and 'typography/css/shorthand', dropped entirely (not
      // swapped) — it collapses a typography token's $value into a single `font` shorthand
      // *string* before 'ds/typography' ever sees it, and there's no way to recover the original
      // {fontFamily, fontSize, fontWeight, lineHeight} object from that string. This codebase wants
      // 4 separate longhand custom properties per typography token, never a shorthand
      // (docs/plans/typography-token-type-plan.md decision 5) — verified directly, same as
      // shadow/border's own built-ins (the shorthand only became visible once a real
      // $type: "typography" token existed to trigger its filter).
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'html/icon',
        'size/rem',
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',
        'strokeStyle/css/shorthand',
        'transition/css/shorthand',
        'ds/css/name',
        'ds/color/rgba',
        'ds/size/round',
        'ds/size/rem',
        'ds/font-weight',
        'ds/shadow',
        'ds/border',
        'ds/typography',
      ],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'ds',
      files: [
        {
          format: 'ds/css/variables-responsive',
          destination: `css/${mode.toLowerCase()}.tokens.css`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    sass: {
      // CSS custom properties can't appear inside an `@media` condition (`@media (min-width:
      // var(--x))` is invalid per spec, not just unsupported) — so
      // packages/css/src/scss/mixins/breakpoint.mixin.scss needs real Sass variables, resolved at
      // compile time, for its `@media` conditions and `- 1px` arithmetic. This platform exists
      // solely to feed that: filtered to breakpoint tokens only (Global.Dimension.Breakpoint.* and
      // Alias.Breakpoint.*, the latter referencing the former — both must ship together for the
      // Sass `$var: $other-var` reference to resolve) — everything else in this design system is
      // CSS-only. Transforms mirror the 'web' platform's (not 'css' platform's, which forces
      // 'size/rem'): breakpoint tokens are defined with an explicit "px" unit, and 'ds/dimension'
      // (unlike the stock 'size/rem') preserves that unit rather than converting it, which is what
      // the mixin's px-based media queries need.
      transforms: [
        'attribute/cti',
        'name/kebab',
        'color/css',
        'ds/css/name',
        'ds/color/hex',
        'ds/size/rem',
        'ds/font-weight',
        'ds/font-family',
        'size/rem',
        'ds/dimension',
        'ds/shadow',
        'ds/border',
        'ds/typography',
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'ds/scss/variables',
          destination: `sass/${mode.toLowerCase()}.tokens.scss`,
          filter: token => token.path.some(segment => segment.includes('Breakpoint')),
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    web: {
      // No transformGroup — the 'web' transformGroup's built-in 'size/px' unconditionally forces
      // a "px" suffix without converting the number, which is wrong for a rem-unit dimension
      // token (1.5rem would come out "1.5px": wrong unit label AND physically 24x smaller). Listed
      // explicitly instead: 'attribute/cti'/'name/kebab'/'color/css' are 'web' transformGroup's
      // other members, kept verbatim so nothing else about this platform's output changes;
      // 'size/px' is dropped in favor of our own 'ds/dimension', which correctly preserves
      // whichever unit the $value carries.
      //
      // The built-in 'size/rem' is added (harmlessly redundant with 'ds/dimension' for every
      // standalone dimension token, since it already preserves an explicitly-provided unit the
      // same way) because a border composite token's 'width' sub-value is a *reference* to a
      // separate dimension token (see docs/plans/border-token-type-plan.md decision 4) — Style
      // Dictionary only resolves that reference to its referenced token's already-transformed
      // value when a transform *named* 'size/rem'/'color/css' is present, not an arbitrary
      // custom-named dimension transform. Without it, 'ds/border' would see a null width for
      // every Composite.* token on this platform.
      transforms: [
        'attribute/cti',
        'name/kebab',
        'color/css',
        'ds/css/name',
        'ds/color/hex',
        'ds/size/rem',
        'ds/font-weight',
        'ds/font-family',
        'size/rem',
        'ds/dimension',
        'ds/shadow',
        'ds/border',
        'ds/typography',
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'ds/json/flat',
          destination: `web/${mode.toLowerCase()}.tokens.json`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    docs: {
      // See the 'web' platform's comment above — same fix, same reasoning.
      transforms: [
        'attribute/cti',
        'name/kebab',
        'color/css',
        'ds/css/name',
        'ds/color/hex',
        'ds/size/rem',
        'ds/font-weight',
        'ds/font-family',
        'size/rem',
        'ds/dimension',
        'ds/shadow',
        'ds/border',
        'ds/typography',
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'json',
          destination: `docs/${mode.toLowerCase()}.tokens.json`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
    javascript: {
      transformGroup: 'js',
      transforms: [
        'ds/js/name',
        'ds/color/hex',
        'ds/size/round',
        'ds/dimension/js',
        'ds/font-weight',
        'ds/font-family',
        'ds/shadow',
        'ds/border',
        'ds/typography',
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'ds/javascript/es6',
          destination: `js/${mode.toLowerCase()}.tokens.js`,
        },
      ],
      options: {
        outputReferences: true,
      },
    },
  },
}

export default config
