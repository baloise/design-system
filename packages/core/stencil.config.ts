import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'
import fg from 'fast-glob'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { join, parse, resolve } from 'path'

import { webOutputTarget } from '@baloise/output-target-web'
import { enrichComponentDocsJson } from './config/docs-json-no-timestamp'
import { AngularGenerator } from './config/stencil.bindings.angular'
import { ReactGenerator } from './config/stencil.bindings.react'

const IS_DS_RELEASE = process.env.DS_RELEASE === 'true'
const IS_DS_DEVELOPMENT = process.env.DS_DEVELOPMENT === 'true'

let message = ''

if (IS_DS_RELEASE) {
  message = '🚀 Build is set to release 🚀'
}

if (IS_DS_DEVELOPMENT) {
  message = '👷 Build is set to development 👷'
}

if (message) {
  console.log('')
  console.log(message)
  console.log('')
}

const workspaceDir = join(parse(__dirname).dir, '..')
const packagesDir = join('../..')
const nodeModulesProject = join(__dirname, 'node_modules')
const nodeModulesWorkspace = join(workspaceDir, 'node_modules')

export const config: Config = {
  autoprefixCss: true,
  sourceMap: false,
  namespace: 'design-system',
  preamble: '(C) Helvetia Design System https://design.baloise.dev/ - Apache License 2.0',
  hashedFileNameLength: 10,
  enableCache: true,
  transformAliasedImportPaths: true,
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/global.scss',
  tsconfig: IS_DS_RELEASE ? 'tsconfig.release.json' : 'tsconfig.lib.json',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: [nodeModulesWorkspace, nodeModulesProject, 'node_modules'],
      silenceDeprecations: ['bogus-combinators'],
    }),
  ],
  extras: {
    /**
     * Projects that use a Stencil library built using the `dist` output target may have trouble lazily
     * loading components when using a bundler such as Vite or Parcel. Setting this flag to `true` will change how Stencil
     * lazily loads components in a way that works with additional bundlers. Setting this flag to `true` will increase
     * the size of the compiled output. Defaults to `false`.
     */
    enableImportInjection: !IS_DS_DEVELOPMENT, // true,
    /**
     * When a component is first attached to the DOM, this setting will wait a single tick before
     * rendering. This works around an Angular issue, where Angular attaches the elements before
     * settings their initial state, leading to double renders and unnecessary event dispatches.
     * Defaults to `false`.
     */
    initializeNextTick: !IS_DS_DEVELOPMENT, // true,
    /**
     * This option enables all current and future slot-related fixes.
     * {@link https://stenciljs.com/docs/config-extras#experimentalslotfixes}
     */
    experimentalSlotFixes: true,
  },
  outputTargets: [
    /**
     * The dist type is to generate the component(s) as a reusable library that can be self-lazy loading, such as Ionic.
     * When creating a distribution, the project's package.json will also have to be updated. However,
     * the generated bundle is tree-shakable, ensuring that only imported components will end up in the build.
     *
     * {@link https://stenciljs.com/docs/distribution}
     */
    !IS_DS_DEVELOPMENT && {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    /**
     * The dist-custom-elements output target creates custom elements that directly extend HTMLElement and provides
     * simple utility functions for easily defining these elements on the Custom Element Registry. This output target
     * excels in use in frontend frameworks and projects that will handle bundling, lazy-loading,
     * and custom element registration themselves.
     *
     * {@link https://stenciljs.com/docs/custom-elements}
     */
    !IS_DS_DEVELOPMENT && {
      type: 'dist-custom-elements',
      dir: 'components',
      includeGlobalScripts: false,
      generateTypeDeclarations: true,
      /**
       * External Runtime uses default runtime settings instead of this file's definitions. Disabling it enables
       * `experimentalSlotFixes` to be applied and prevents `@stencil/core/internal/client` from being imported, which
       * contains a dynamic import that caused a warning in Angular.
       */
      externalRuntime: false,
    },
    /**
     * Custom output target that generates web components as standalone custom elements
     * that can be used directly without a framework or bundler.
     *
     * {@link https://stenciljs.com/docs/custom-elements}
     */
    !IS_DS_DEVELOPMENT &&
      webOutputTarget({
        dir: 'components',
      }),
    /**
     * The www output target type is oriented for webapps and websites, hosted from an http server, which can benefit
     * from prerendering and service workers, such as this very site you're reading. If the outputTarget config is not
     * provided it'll default to having just the www type.
     *
     * {@link https://stenciljs.com/docs/www}
     */
    {
      type: 'www',
      dir: 'www',
      serviceWorker: false,
      empty: false,
      copy: [
        {
          src: '**/*.html',
        },
        {
          src: join(packagesDir, 'core', 'public', 'section.css'),
          dest: 'assets/section.css',
          warn: true,
        },
        {
          src: join(packagesDir, 'assets', 'src', 'fonts'),
          dest: 'assets/fonts',
          warn: true,
        },
        {
          src: join(packagesDir, 'core', 'public', 'images'),
          dest: 'assets/images',
          warn: true,
        },
      ],
    },
    /**
     * One of the core features of web components is the ability to create custom elements, which
     * allow developers to reuse custom functionality defined in their components. When Stencil compiles a
     * project, it generates a custom element for each component in the project. Each of these custom
     * elements has an associated tag name that allows the custom element to be used in HTML files.
     *
     * {@link https://stenciljs.com/docs/docs-vscode#vs-code-documentation}
     */
    !IS_DS_DEVELOPMENT && {
      type: 'docs-vscode',
      file: 'docs/html.html-data.json',
      sourceCodeBaseUrl: 'https://github.com/baloise/design-system',
    },
    /**
     * Custom output target that generates docs JSON without timestamps and file paths.
     * Enriches components with design tokens from Base.tokens.json and extracts CSS variable docs
     * from component SCSS files. Produces a clean, reusable docs/components.json for consistent git diffs.
     *
     * {@link https://stenciljs.com/docs/docs-json}
     */
    !IS_DS_DEVELOPMENT &&
      enrichComponentDocsJson({
        type: 'docs-json',
        file: 'docs/components.json',
      }),
  ].filter(Boolean) as any,
  rollupPlugins: {
    before: [
      {
        name: 'watch-external',
        async buildStart() {
          /**
           * Add stylesheets (.scss) and template (.html) files to the watcher.
           */
          const styleFiles = await fg(resolve(__dirname, './src/**/*.scss'))
          for (const file of styleFiles) {
            this.addWatchFile(file)
          }

          const templateFiles = await fg(resolve(__dirname, './src/**/*.html'))
          for (const file of templateFiles) {
            this.addWatchFile(file)
          }

          /**
           * Generating the tags.json list
           */
          const componentFiles = await fg(resolve(__dirname, './src/components/**/*.tsx'))
          const allTags = (
            await Promise.all(
              componentFiles.map(async f => {
                const src = await readFile(f, 'utf-8')
                const m = src.match(/tag:\s*['"]([^'"]+)['"]/)
                return m ? m[1] : null
              }),
            )
          )
            .filter((t): t is string => !!t)
            .sort()

          const constantsDir = resolve(__dirname, 'src/global/constants')
          const destDir = resolve(__dirname, 'docs')

          await mkdir(constantsDir, { recursive: true })
          await writeFile(
            resolve(constantsDir, 'tags.constant.ts'),
            `// This file is auto-generated by stencil.config.ts - do not edit manually\n\nexport const tags: string[] = ${JSON.stringify(allTags, null, 2)}\n`,
          )

          await mkdir(destDir, { recursive: true })
          await writeFile(resolve(destDir, 'tags.json'), JSON.stringify(allTags, null, 2))
        },
      },
    ],
  },
  testing: {
    rootDir: 'src',
  },
}
