import express from 'express'
import { renderToString } from '@helvetia-design/core/hydrate'

// Server-rendered fragment: real markup for every ds-* custom element, already inside a
// declarative shadow root, before any client-side JavaScript runs.
const fragment = `
  <ds-root>
    <main class="ds-container mt-base">
      <h1 class="ds-heading" data-testid="heading">Hello World</h1>
      <ds-button data-testid="button">Button</ds-button>
      <ds-input data-testid="input" name="ssr-input" label="Name"></ds-input>
      <ds-checkbox data-testid="checkbox">Accept</ds-checkbox>
    </main>
  </ds-root>
`

async function renderPage(): Promise<string> {
  const { html } = await renderToString(fragment, {
    fullDocument: false,
    serializeShadowRoot: 'declarative-shadow-dom',
  })

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>integration-ssr</title>
    <link rel="stylesheet" href="/assets/base.tokens.css" />
    <link rel="stylesheet" href="/assets/design-system.css" />
  </head>
  <body>
    ${html}
    <script type="module" src="/assets/design-system/design-system.esm.js"></script>
  </body>
</html>
`
}

const app = express()

app.get('/', async (_req, res) => {
  res.type('html').send(await renderPage())
})

// `pnpm copy-assets` stages everything the client needs — the design-system JS
// chunks plus the tokens/styles CSS — into public, served as-is below.
app.use('/assets', express.static('public'))

const port = Number(process.env.PORT ?? 3100)
app.listen(port, () => {
  console.log(`integration-ssr listening on http://localhost:${port}`)
})
