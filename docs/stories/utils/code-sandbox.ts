export function parseCodeSandboxMarkDown(content: string): string {
  return content
    .replace('```html', '')
    .replace('```ts', '')
    .replace('```typescript', '')
    .replace('```css', '')
    .replace('```sass', '')
    .replace('```', '')
    .trim()
}

export function newCodeSandboxFile(path: string, content = '') {
  return {
    [`src/app/${path}`]: {
      isBinary: false,
      content: parseCodeSandboxMarkDown(content),
    },
  }
}
