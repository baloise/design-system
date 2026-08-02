import React from 'react'
import { ModuleExport } from 'storybook/internal/types'
import { CanvasWithCodePen } from './CanvasWithCodePen'
import { Tabs } from './Tabs'

type CanvasTabsProps = {
  of: ModuleExport
  sourceState?: 'hidden' | 'shown' | 'none'
  htmlFirst?: boolean
  htmlOf: ModuleExport
  overflowVisible?: boolean
}

export const CanvasTabs = ({
  of: ofStory,
  sourceState = 'shown',
  htmlFirst = false,
  htmlOf,
  overflowVisible = false,
}: CanvasTabsProps): React.ReactElement => {
  const wcTab = {
    label: 'Web Component',
    content: (
      <>
        <CanvasWithCodePen of={ofStory} sourceState="shown" overflowVisible={overflowVisible} />
      </>
    ),
  }
  const htmlTab = {
    label: 'HTML & CSS',
    content: <CanvasWithCodePen of={htmlOf} sourceState={sourceState} overflowVisible={overflowVisible} />,
  }

  return <Tabs tabs={htmlFirst ? [htmlTab, wcTab] : [wcTab, htmlTab]} />
}
