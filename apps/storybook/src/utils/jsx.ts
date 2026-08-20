const toKebabToPascal = (tag: string): string =>
  tag
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const toCamelEventName = (name: string): string => {
  let camel = name.charAt(0).toUpperCase() + name.slice(1)
  camel = camel.replace(/^(Ds|Bal)([a-z])/, (_, prefix, first) => prefix + first.toUpperCase())
  return camel.charAt(0).toLowerCase() + camel.slice(1)
}

export const htmlToJsx = (html: string): string => {
  let jsx = html

  // Convert custom element opening tags: <ds-button foo="bar"> → <DsButton foo="bar">
  jsx = jsx.replace(/<([a-z][a-z0-9]*(?:-[a-z0-9]+)+)(\s[^>]*)?(\/?)>/g, (_, tag, attrs = '', selfClose) => {
    const pascal = toKebabToPascal(tag)
    return `<${pascal}${attrs}${selfClose}>`
  })

  // Convert custom element closing tags: </ds-button> → </DsButton>
  jsx = jsx.replace(/<\/([a-z][a-z0-9]*(?:-[a-z0-9]+)+)>/g, (_, tag) => `</${toKebabToPascal(tag)}>`)

  // Self-close empty PascalCase components: <DsIcon name="x"></DsIcon> → <DsIcon name="x" />
  jsx = jsx.replace(/<([A-Z][A-Za-z0-9]*)(\s[^>]*)?>[\s]*<\/\1>/g, (_, tag, attrs = '') => `<${tag}${attrs} />`)

  // JSX attribute replacements
  jsx = jsx.replace(/\bclass=/g, 'className=')
  jsx = jsx.replace(/\bfor=/g, 'htmlFor=')

  // Convert HTML event attributes to JSX: onclick="fn" → onClick={fn}, ondschange="fn" → onDsChange={fn}
  jsx = jsx.replace(/\bon([a-z]+)="([^"]*)"/g, (_, name, value) => {
    const camel = toCamelEventName(name)
    return `on${camel.charAt(0).toUpperCase() + camel.slice(1)}={${value}}`
  })

  return jsx
}

export const htmlToAngular = (html: string): string => {
  let ng = html

  // Convert event attributes to Angular binding syntax: onclick="x" → (click)="x", ondschange="x" → (dsChange)="x"
  ng = ng.replace(/\bon([a-z]+)="([^"]*)"/g, (_, name, handler) => `(${toCamelEventName(name)})="${handler}"`)

  return ng
}
