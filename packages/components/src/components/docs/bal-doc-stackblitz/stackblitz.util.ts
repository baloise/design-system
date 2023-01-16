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

export const getFramework = (): Frameworks => JSON.parse(localStorage.getItem('bal-docs-framework') || '') || 'angular'
