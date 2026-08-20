import { global } from '@storybook/global'
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

/**
 * Defaults the tab order/selection to the currently active integration technology
 * (toolbar "framework" global): HTML & CSS first when "html" is selected, Web
 * Component first for "angular"/"react". Pass `htmlFirst` explicitly to override.
 */
const isHtmlFrameworkActive = (): boolean => {
  try {
    return global['__STORYBOOK_PREVIEW__'].storyStoreValue.userGlobals.globals.framework === 'html'
  } catch {
    return false
  }
}

export const CanvasTabs = ({
  of: ofStory,
  sourceState = 'shown',
  htmlFirst,
  htmlOf,
  overflowVisible = false,
}: CanvasTabsProps): React.ReactElement => {
  const resolvedHtmlFirst = htmlFirst ?? isHtmlFrameworkActive()
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

  return <Tabs tabs={resolvedHtmlFirst ? [htmlTab, wcTab] : [wcTab, htmlTab]} />
}
