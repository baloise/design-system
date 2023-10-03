/** @type { import('@storybook/html').Decorator } */
export const decorators = [(Story) => `<bal-doc-app>${Story().outerHTML || Story()}</bal-doc-app>`];

/** @type { import('@storybook/html').Preview } */
const preview = {
  globalTypes: {
    framework: {
      name: 'Framework',
      description: 'Integration technology',
      defaultValue: 'Angular',
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        ignoreSelector: '.docs-story',
        title: 'On this page',
        disable: false,
      },
    },
    viewport: {
      viewports: {
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
    a11y: {
      config: {
        rules: [
          {
            id: 'duplicate-id-active',
            enabled: false,
          },
          {
            id: 'duplicate-id',
            enabled: false,
          },
        ],
      },
    },
    backgrounds: {
      grid: {
        cellSize: 8,
      },
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'blue',
          value: '#000d6e',
        },
        {
          name: 'green',
          value: '#94e3d4',
        },
        {
          name: 'purple',
          value: '#b8b2ff',
        },
        {
          name: 'red',
          value: '#ffaca6',
        },
        {
          name: 'yellow',
          value: '#fae052',
        },
      ],
    },
  },
}

export default preview
