import React from 'react'
import componentsData from '../../src/assets/data/components.json'

type ComponentPublicMethodsProps = {
  component: string
  subComponents?: string[]
  title?: string
  description?: string
}

type MethodParameter = {
  name: string
  type: string
  docs?: string
}

type MethodReturn = {
  type: string
  docs?: string
}

type ComponentMethod = {
  name: string
  signature: string
  parameters?: MethodParameter[]
  returns?: MethodReturn
  docs?: string
  docsTags?: Array<{ name: string; text: string }>
}

const toPascalCase = (tag: string): string =>
  tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

const findComponent = (name: string) => {
  const tag = name.startsWith('ds-') ? name : `ds-${name}`
  return (componentsData.components as Array<any>).find(c => c.tag === tag || c.tag === name)
}

const MethodList = ({ methods, heading }: { methods: ComponentMethod[]; heading?: string }): React.ReactElement => (
  <div className="mb-large">
    {heading && <h3 className="title text-xl mb-normal mt-large">{heading}</h3>}
    {methods.length === 0 ? (
      <div className="my-normal p-large bg-grey-light radius">
        <p className="text-small">No public methods available.</p>
      </div>
    ) : (
      methods.map((method, index) => (
        <div key={index} className="mb-large">
          <h4 className="title text-lg mb-small">{method.name}</h4>
          <pre className="bg-grey-light p-normal radius overflow-auto">
            {method.docs && <p className="text text-normal text-primary mb-normal">{method.docs}</p>}
            <code className="text-small font-family-monospace">{method.signature}</code>
          </pre>
        </div>
      ))
    )}
  </div>
)

export const ComponentPublicMethods = ({
  component,
  subComponents,
  title = 'Public Methods',
  description,
}: ComponentPublicMethodsProps): React.ReactElement => {
  const componentInfo = findComponent(component)

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-large p-large bg-orange-2 radius text-orange-dark">
        Component not found: {component}
      </div>
    )
  }

  const hasSubComponents = subComponents && subComponents.length > 0

  if (!hasSubComponents) {
    const methods = (componentInfo.methods || []) as ComponentMethod[]

    if (methods.length === 0) {
      return (
        <div className="sb-unstyled">
          <h2 className="title text-2xl mb-normal">{title}</h2>
          <div className="my-large p-large bg-grey-light radius">
            <p className="text-small">No public methods available for this component.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="sb-unstyled my-large">
        <h2 className="title text-2xl mb-normal">{title}</h2>
        {description && <p className="text-normal mb-large">{description}</p>}
        {methods.map((method, index) => (
          <div key={index} className="mb-large">
            <h3 className="title text-xl mb-small">{method.name}</h3>
            <pre className="bg-grey-light p-normal radius overflow-auto">
              {method.docs && <p className="text text-normal text-primary mb-normal">{method.docs}</p>}
              <code className="text-small font-family-monospace">{method.signature}</code>
            </pre>
          </div>
        ))}
      </div>
    )
  }

  const allEntries = [component, ...subComponents].map(name => {
    const info = findComponent(name)
    const rawTag = name.startsWith('ds-') ? name.slice(3) : name
    return {
      heading: toPascalCase(rawTag),
      methods: info ? ((info.methods || []) as ComponentMethod[]) : [],
      notFound: !info,
    }
  })

  return (
    <div className="sb-unstyled my-large">
      <h2 className="title text-2xl mb-normal">{title}</h2>
      {description && <p className="text-normal mb-large">{description}</p>}
      {allEntries.map((entry, index) =>
        entry.notFound ? (
          <div key={index} className="my-large p-large bg-orange-2 radius text-orange-dark">
            Component not found: {entry.heading}
          </div>
        ) : (
          <MethodList key={index} methods={entry.methods} heading={entry.heading} />
        ),
      )}
    </div>
  )
}
