import { useOf } from '@storybook/addon-docs/blocks'
import { STORY_ARGS_UPDATED, UPDATE_STORY_ARGS } from 'storybook/internal/core-events'
import { getChannel } from 'storybook/preview-api'
import { ModuleExport } from 'storybook/internal/types'
import { useEffect } from 'react'

type SyncStoryArgsProps = {
  from: ModuleExport
  to: ModuleExport
}

/**
 * Mirrors arg changes from `from` onto `to`. Storybook keeps args per story export, so the
 * on-page Controls table (bound to the Web Component story) otherwise has no effect on the
 * "HTML & CSS" tab's sibling story, even though both represent the same component.
 *
 * Uses the raw addons channel instead of Storybook's preview hooks (`useChannel`/`useArgs`) —
 * those may only be called inside a decorator or story function, not an MDX docs block.
 */
export const SyncStoryArgs = ({ from, to }: SyncStoryArgsProps): null => {
  const fromResolved = useOf(from, ['story'])
  const toResolved = useOf(to, ['story'])
  const fromId = fromResolved?.story?.id
  const toId = toResolved?.story?.id
  const initialArgs = fromResolved?.story?.initialArgs

  useEffect(() => {
    if (!fromId || !toId) return

    const channel = getChannel()
    if (!channel) return

    if (initialArgs) {
      channel.emit(UPDATE_STORY_ARGS, { storyId: toId, updatedArgs: initialArgs })
    }

    const handleArgsUpdated = (payload: { storyId: string; args: Record<string, unknown> }) => {
      if (payload.storyId === fromId) {
        channel.emit(UPDATE_STORY_ARGS, { storyId: toId, updatedArgs: payload.args })
      }
    }

    channel.on(STORY_ARGS_UPDATED, handleArgsUpdated)
    return () => channel.off(STORY_ARGS_UPDATED, handleArgsUpdated)
  }, [fromId, toId, initialArgs])

  return null
}
