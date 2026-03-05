export const inlineData = (content: string): string => {
  const regex = /[\r\n]+/g // remove all line breaks
  return `data:image/svg+xml;utf-8, ${content.replace(regex, '')}`
}
