import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssBackgroundColors = () => (
  <CssUtilitiesTable utility="background" example={item => <div className={`${item.class} p-small`}></div>} />
)
