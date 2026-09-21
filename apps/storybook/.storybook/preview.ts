import type { Decorator, Preview } from '@storybook/html-vite'
import {
  updateDsAllowedLanguages,
  updateDsLanguage,
  updateDsRegion,
  type DsLanguage,
  type DsRegion,
} from '@baloise/ds-core'

const BRAND_LINK_ID = 'brand-theme-stylesheet'

// The language toolbar (see addons/language.addon.tsx) lets you preview every translation the
// design system ships, but components reject any language outside `config.allowedLanguages`
// (which defaults to a region-specific subset) and silently fall back instead. Widen it here so
// switching the toolbar actually changes the rendered text.
updateDsAllowedLanguages(['de', 'en', 'fr', 'it', 'nl', 'es', 'pl', 'pt', 'sv', 'fi'])

export const decorators: Decorator[] = [
  (Story: any, context: any) => {
    const region: DsRegion | undefined = context.globals?.region
    const language: DsLanguage | undefined = context.globals?.language

    if (region) updateDsRegion(region)
    if (language) updateDsLanguage(language)

    return Story()
  },
  (Story: any, context: any) => {
    const theme: string = context.globals?.theme ?? ''
    const story = Story()

    let link = document.getElementById(BRAND_LINK_ID) as HTMLLinkElement | null
    if (theme) {
      if (!link) {
        link = document.createElement('link')
        link.id = BRAND_LINK_ID
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
      link.href = `/assets/tokens/${theme}.override.css`

      const wrapper = document.createElement('div')
      wrapper.setAttribute('data-theme', theme)
      if (typeof story === 'string') {
        wrapper.innerHTML = story
      } else {
        wrapper.append(story)
      }
      return wrapper
    } else {
      link?.remove()
      return story
    }
  },
]

const preview: Preview = {
  globalTypes: {
    framework: {
      name: 'Framework',
      description: 'Integration technology',
      defaultValue: 'Angular',
    },
    theme: {
      name: 'Theme',
      description: 'Brand theme',
      defaultValue: '',
    },
    region: {
      name: 'Region',
      description: 'Design system region',
      defaultValue: 'CH',
    },
    language: {
      name: 'Language',
      description: 'Design system language',
      defaultValue: 'de',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: false },
    options: {
      storySort: {
        order: [
          'Welcome',
          "What's New",
          'Versions',
          'Support',
          'Contributing',
          'Foundation',
          [
            'Overview',
            'Border & Radius',
            'Brand Assets',
            'Colors',
            'Design Tokens',
            'Elevation',
            'Iconography',
            'Grid',
            'Layout',
            'Spacing',
            'Typography',
          ],
          'Tokens',
          'CSS Utilities',
          'Components',
          [
            'Overview',
            'Actions',
            ['Overview'],
            'Forms',
            ['Overview'],
            'Indicators',
            ['Overview'],
            'Media',
            ['Overview'],
            'Navigation',
            ['Overview'],
            'Overlays',
            ['Overview'],
            'Structure',
            ['Overview'],
          ],
          'Development',
        ],
      },
    },
    viewport: {
      options: {
        small: {
          name: 'Small (Mobile) from 420px to 768px',
          styles: {
            width: '420px',
            height: '667px',
          },
          type: 'mobile',
        },
        medium: {
          name: 'Medium (Tablet)',
          styles: {
            width: '1023px',
            height: '834px',
          },
          type: 'tablet',
        },
        large: {
          name: 'Large (Desktop)',
          styles: {
            width: '1216px',
            height: '801px',
          },
          type: 'desktop',
        },
        widescreen: {
          name: 'Widescreen (Desktop)',
          styles: {
            width: '1440px',
            height: '801px',
          },
          type: 'desktop',
        },
        fullhd: {
          name: 'FullHD (Desktop)',
          styles: {
            width: '1920px',
            height: '801px',
          },
          type: 'desktop',
        },
      },
    },
    backgrounds: {
      grid: {
        cellSize: 8,
      },
      // default: 'white',
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#000d6e' },
        green: { name: 'Green', value: '#94e3d4' },
        purple: { name: 'Purple', value: '#b8b2ff' },
        red: { name: 'Red', value: '#ffaca6' },
        yellow: { name: 'Yellow', value: '#fae052' },
      },
    },
  },
}

export default preview
