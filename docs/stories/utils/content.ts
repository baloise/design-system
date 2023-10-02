export const defaultContent = { description: 'Example content of the component', defaultValue: 'Hello World' }

export const withContent = ({ description, defaultValue } = defaultContent) => {
  const options = { ...defaultContent, description, defaultValue }
  return {
    content: {
      control: 'text',
      description: options.description.trim(),
      defaultValue: options.defaultValue.trim(),
      table: {
        defaultValue: { summary: options.defaultValue.trim() },
        type: { summary: 'string' },
      },
    },
  }
}
