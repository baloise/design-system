import { Canvas, useOf } from '@storybook/addon-docs/blocks'
import React, { useMemo } from 'react'
import { ModuleExport } from 'storybook/internal/types'
import { openInCodePen } from './codepen'

type CanvasWithCodePenProps = {
  of: ModuleExport
  sourceState?: 'hidden' | 'shown' | 'none'
  className?: string
}

/**
 * Canvas block with an additional "Open in CodePen" button in the toolbar.
 * Reads the pre-rendered HTML from story.parameters.mySource (set by StoryFactory)
 * and opens CodePen with appropriate CDN resources based on the component type.
 */
export const CanvasWithCodePen = ({
  of,
  sourceState = 'shown',
  className,
}: CanvasWithCodePenProps): React.ReactElement => {
  const resolved = useOf(of, ['story'])
  const story = resolved?.story

  const source = useMemo(() => {
    return (story?.parameters?.mySource as string) || ''
  }, [story?.parameters?.mySource])

  const additionalActions = useMemo(() => {
    return [
      {
        title: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0L0 8v8l12 8 12-8V8zm0 2.31L22 9.5v.01L12 16 2 9.51zm-1 15.37L2 12.23v-1.19l9 5.99zm2 0v-3.15l9-5.99v1.19z" />
            </svg>
            CodePen
          </span>
        ),
        onClick: () => openInCodePen(source),
      },
    ]
  }, [source])

  return <Canvas of={of} sourceState={sourceState} className={className} additionalActions={additionalActions} />
}
