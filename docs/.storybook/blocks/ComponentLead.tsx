import React from 'react'
import componentsData from '../../src/assets/data/components.json'
import { Lead } from './Lead'

type ComponentLeadProps = {
  component: string
}

export const ComponentLead = ({ component }: ComponentLeadProps): React.ReactElement => {
  const componentTag = component.startsWith('ds-') ? component : `ds-${component}`

  const componentInfo =
    (componentsData.components as Array<any>).find(comp => comp.tag === componentTag || comp.tag === component) || {}

  const leadText = componentInfo.overview || componentInfo.docs

  if (!leadText) {
    return <Lead>{''}</Lead>
  }

  // Extract component name from tag (remove 'ds-' prefix if present)
  const componentName = componentTag.startsWith('ds-') ? componentTag.slice(3) : componentTag

  // Split text into words
  const words = leadText.split(' ')
  const firstWord = words[0]
  const restWords = words.slice(1).join(' ')

  // Check if first word matches component name (case-insensitive, ignoring punctuation)
  const firstWordClean = firstWord.toLowerCase().replace(/[^a-z0-9]/g, '')
  const componentNameClean = componentName.toLowerCase().replace(/[^a-z0-9]/g, '')

  if (firstWordClean === componentNameClean) {
    return (
      <Lead>
        <strong>{firstWord}</strong> {restWords}
      </Lead>
    )
  }

  return <Lead>{leadText}</Lead>
}
