import React from 'react'
import { IconGallery, IconItem } from '@storybook/blocks'
import icons from '../../stories/assets/data/icons.json'

export const IconOverview = ({ children }) => {
  return (
    <IconGallery>
      {icons.sort().map(icon => (
        <IconItem name={icon} key={icon}>
          <bal-icon name={icon} />
        </IconItem>
      ))}
    </IconGallery>
  )
}
