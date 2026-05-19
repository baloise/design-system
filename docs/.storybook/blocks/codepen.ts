/**
 * Opens a CodePen pen with pre-filled HTML and CDN resources.
 * Uses CodePen's documented prefill API via form POST to https://codepen.io/pen/define
 *
 * @param html - The rendered story HTML (body content only)
 */
export const openInCodePen = (html: string): void => {
  const DESIGN_SYSTEM_VERSION = '20.0.0-next.4'
  const JS_DELIVR = 'https://cdn.jsdelivr.net/npm/'

  const payload: Record<string, string> = {
    title: 'Helvetia Design System',
    editors: '100',
    html: html || '',
    head: `<script type="module" src="${JS_DELIVR}@baloise/ds-core@${DESIGN_SYSTEM_VERSION}/dist/design-system/design-system.esm.js"></script>`,
    css_external: `${JS_DELIVR}@baloise/ds-css@${DESIGN_SYSTEM_VERSION}/dist/css/design-system.css`,
    js_external: `${JS_DELIVR}@baloise/ds-core@${DESIGN_SYSTEM_VERSION}/dist/design-system/design-system.js`,
  }

  // Create a temporary form and submit it to CodePen
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://codepen.io/pen/define'
  form.target = '_blank'
  form.style.display = 'none'

  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'data'
  input.value = JSON.stringify(payload)

  form.appendChild(input)
  document.body.appendChild(form)

  form.submit()

  // Clean up
  document.body.removeChild(form)
}
