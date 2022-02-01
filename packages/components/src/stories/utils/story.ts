import { stencilArgType } from './args'
import { withSoureCode } from './parameter'

export type ComponentStatus = 'beta' | 'stable' | 'deprecated' | 'releaseCandidate'

export interface BalComponentStoryOptions {
  component: any
  title?: string
  subcomponents?: any
  args?: any
  argTypes?: any
  docs?: string
  layout?: 'fullscreen'
  status?: ComponentStatus
}

export interface BalComponentStoryType {
  story: {
    title: string
    component: any
    subcomponents: any
    argTypes: any
    args: any
    parameters: {
      docs: {
        page: string
      }
      layout: undefined | 'fullscreen'
      status: {
        type?: ComponentStatus
      }
    }
  }
  components: any
  sourceCode(variant: (args: any) => { template: string }): any
}

export const BalComponentStory = (story: BalComponentStoryOptions): BalComponentStoryType => {
  const argTypes = {
    ...stencilArgType(story.component),
    ...story.argTypes,
  }
  return {
    story: {
      title: story.title || `Components/${toPascalCase(story.component.name).substring(3)}`,
      component: story.component,
      subcomponents: story.subcomponents || {},
      argTypes,
      args: story.args || {},
      parameters: {
        docs: {
          page: story.docs,
        },
        layout: story.layout,
        status: {
          type: story.status,
        },
      },
    },
    components: {
      [toPascalCase(story.component.name)]: story.component,
      ...story.subcomponents,
    },
    sourceCode: (variant: (args: any) => { template: string }): { docs: { source: { code: string } } } => {
      const template = variant({}).template
      return withSoureCode(template, argTypes, { ...story.args, ...(variant as any).args })
    },
  }
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase()
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}
