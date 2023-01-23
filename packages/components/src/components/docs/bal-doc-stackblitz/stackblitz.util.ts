export type Frameworks = 'angular' | 'react' | 'html' | 'vue'

export const parseMarkdown = (content: string) => {
  if (content.startsWith('```')) {
    const lines = content.split('\n')
    lines.splice(0, 1)
    return lines.join('\n').replace('```', '')
  }
  return content
}

export const loadSourceFiles = async (files: string[]) => {
  const sourceFiles = await Promise.all(files.map(f => fetch(`/assets/code/${f}`)))
  return await Promise.all(sourceFiles.map(res => res.text()))
}

export const getFramework = (): Frameworks => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const paramFramework = params.globals?.replace('framework:', '')

  if (paramFramework !== undefined) {
    localStorage.setItem('bal-docs-framework', JSON.stringify(paramFramework))
    return paramFramework as Frameworks
  }

  const storageValue = localStorage.getItem('bal-docs-framework')
  if (storageValue === null) {
    localStorage.setItem('bal-docs-framework', JSON.stringify('angular'))
    return 'angular'
  }

  return JSON.parse(storageValue)
}
