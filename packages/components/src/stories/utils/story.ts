import { stencilArgType } from './args'
import { withSourceCode } from './parameter'

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

export const sourceCode = (
  variant: (args: any) => { template: string; components: any },
  argTypes: any,
  args: any,
): { docs: { source: { code: string } } } => {
  const template = variant({}).template
  return withSourceCode(template, argTypes, { ...args, ...(variant as any).args }, [])
}

export const BalComponentStory = (story: BalComponentStoryOptions): BalComponentStoryType => {
  const argTypes = {
    ...stencilArgType(story.component),
    ...story.argTypes,
  }

  const components = { [story.component.name]: story.component, ...story.subcomponents }
  return {
    story: {
      title: story.title || `Components/${story.component.name.substring(3)}`,
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
    components,
    sourceCode: (
      variant: (args: any) => { template: string; components: any },
    ): { docs: { source: { code: string } } } => {
      const template = variant({}).template
      const cs = Object.values(variant({}).components).map((c: any) => toPascalCase(c.name))
      return withSourceCode(template, argTypes, { ...story.args, ...(variant as any).args }, cs)
    },
  }
}

function clearAndUpper(text) {
  return text.replace(/-/, '').toUpperCase()
}

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper)
}
