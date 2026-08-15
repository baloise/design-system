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
      // swapped for our own 'ds/shadow'.
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
        'typography/css/shorthand',
        'transition/css/shorthand',
        'ds/css/name',
        'ds/color/rgba',
        'ds/size/round',
        'ds/size/rem',
        'ds/font-weight',
        'ds/shadow',
        'ds/border',
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
    scss: {
      // See the 'css' platform's comment above — 'scss' transformGroup has the exact same built-in
      // shadow/color mismatch, fixed the same way.
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
        'typography/css/shorthand',
        'transition/css/shorthand',
        'ds/css/name',
        'ds/color/rgba',
        'ds/size/round',
        'ds/size/rem',
        'ds/font-weight',
        'ds/shadow',
        'ds/border',
      ],
      basePxFontSize,
      buildPath: 'dist/',
      prefix: 'ds',
      files: [
        {
          format: 'scss/variables',
          destination: `sass/${mode.toLowerCase()}.tokens.scss`,
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
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'json/flat',
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
        'ds/font-weight',
        'ds/font-family',
        'ds/shadow',
        'ds/border',
      ],
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          format: 'javascript/es6',
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
