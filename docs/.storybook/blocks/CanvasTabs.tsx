import React from 'react'
import { ModuleExport } from 'storybook/internal/types'
import { CanvasWithCodePen } from './CanvasWithCodePen'
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
    content: (
      <>
        <CanvasWithCodePen of={ofStory} sourceState="shown" />
      </>
    ),
  }
  const htmlTab = {
    label: 'HTML & CSS',
    content: <CanvasWithCodePen of={htmlOf} sourceState={sourceState} />,
  }

  return <Tabs tabs={htmlFirst ? [htmlTab, wcTab] : [wcTab, htmlTab]} />
}
