import React from 'react'
import componentsData from '../../src/assets/data/components.json'

type ComponentPublicMethodsProps = {
  component: string
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

export const ComponentPublicMethods = ({
  component,
  title = 'Public Methods',
  description,
}: ComponentPublicMethodsProps): React.ReactElement => {
  const componentTag = component.startsWith('ds-') ? component : `ds-${component}`

  const componentInfo = (componentsData.components as Array<any>).find(
    comp => comp.tag === componentTag || comp.tag === component,
  )

  if (!componentInfo) {
    return (
      <div className="sb-unstyled my-large p-large bg-orange-2 radius text-orange-dark">
        Component not found: {component}
      </div>
    )
  }

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
