import type { Meta, StoryObj, StoryContext } from '@storybook/html-vite'
// import type { Meta, StoryObj, StoryContext } from '@storybook/web-components-vite';
import { htmlToAngular, htmlToJsx } from './jsx'

export const StoryFactory = <TArgs>(meta: Meta<TArgs>) => {
  return (story: StoryObj<TArgs> = {}) => {
    const renderer = story.render ? story.render : meta.render
    const initialArgs = { ...meta.args, ...story.args } as TArgs
    let template = 'No source code available'

    if (renderer) {
      const rawTemplate = renderer(initialArgs, {} as any) as any
      template = rawTemplate?.innerHTML ?? 'No source code available'
    }

    return {
      ...story,
      parameters: {
        ...story.parameters,
        docs: {
          ...story.parameters?.docs,
          source: {
            ...story.parameters?.docs?.source,
            // Re-renders the story template with live args so the source panel
            // stays in sync when the user changes controls.
            transform: (_: string, ctx: StoryContext<TArgs>) => {
              if (renderer) {
                const el = renderer({ ...initialArgs, ...ctx.args } as TArgs, {} as any) as any
                const html: string = el?.innerHTML ?? 'No source code available'
                if (ctx.globals?.framework === 'react') return htmlToJsx(html)
                if (ctx.globals?.framework === 'angular') return htmlToAngular(html)
                return html
              }
              return 'No source code available'
            },
          },
        },
        mySource: template,
      },
    }
  }
}
