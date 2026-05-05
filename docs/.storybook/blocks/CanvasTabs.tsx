import { Canvas } from '@storybook/addon-docs/blocks'
import React from 'react'
import { ModuleExport } from 'storybook/internal/types'
import { Tabs } from './Tabs'

type CanvasTabsProps = {
  of: ModuleExport
  sourceState?: 'hidden' | 'shown' | 'none'
  htmlFirst?: boolean
  htmlOf: ModuleExport
}

export const CanvasTabs = ({
  of: ofStory,
  sourceState = 'shown',
  htmlFirst = false,
  htmlOf,
}: CanvasTabsProps): React.ReactElement => {
  const wcTab = {
    label: 'Web Component',
    content: <Canvas of={ofStory} sourceState={sourceState} />,
  }
  const htmlTab = {
    label: 'HTML & CSS',
    content: <Canvas of={htmlOf} sourceState={sourceState} />,
  }

  return <Tabs tabs={htmlFirst ? [htmlTab, wcTab] : [wcTab, htmlTab]} />
}
