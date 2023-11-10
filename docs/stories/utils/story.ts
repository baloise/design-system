import type { Meta, StoryObj } from '@storybook/html'

export const StoryFactory = <TArgs>(meta: Meta<TArgs>) => {
  return (story: StoryObj<TArgs> = {}) => {
    const renderer = story.render ? story.render : meta.render
    const args = { ...meta.args, ...story.args } as TArgs
    let template = 'No source code available'

    if (renderer) {
      const rawTemplate = renderer(args, {} as any) as any
      template = rawTemplate.innerHTML
    }

    return {
      ...story,
      parameters: {
        ...story.parameters,
        docs: {
          ...story.parameters?.docs,
          source: {
            ...story.parameters?.docs?.source,
            code: template,
          },
        },
        mySource: template,
      },
    }
  }
}
