import type { Decorator, Preview } from '@storybook/html-vite'

export const decorators: Decorator[] = [(Story: any) => `${Story().outerHTML || Story()}`]

const preview: Preview = {
  globalTypes: {
    framework: {
      name: 'Framework',
      description: 'Integration technology',
      defaultValue: 'Angular',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: false },
    docs: {
      // toc: {
      //   contentsSelector: '.sbdocs-content',
      //   headingSelector: 'h2, h3',
      //   ignoreSelector: '.docs-story, .title, .subtitle',
      //   title: '', //'On this page',
      //   disable: false,
      // },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Design System',
          'Changelog',
          'Support',
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
          ['Overview'],
          'Development',
        ],
      },
    },
    viewport: {
      options: {
        small: {
          name: 'Small (Mobile) from 320px to 768px',
          styles: {
            width: '320px',
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
