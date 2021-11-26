import { MarkdownTable } from './docs-util'
import { NEWLINE } from './constants'

export interface TestingCommand {
  name: string
  description: string[]
  signature: string
  path: string
  component: string
}

export const commandsToMarkdown = (commands: TestingCommand[] = []) => {
  const content: string[] = []
  if (commands.length === 0) {
    return content
  }

  content.push(`### Custom Commands`)
  content.push(``)
  content.push(`A list of the custom commands for this specific component.`)
  content.push(``)

  const table = new MarkdownTable()

  table.addHeader(['Command', 'Description', 'Signature'])

  commands.forEach(command => {
    table.addRow([`\`${command.name}\``, command.description.join(NEWLINE), `\`${command.signature}\``])
  })

  content.push(...table.toMarkdown())
  content.push(``)
  content.push(``)

  return content
}
