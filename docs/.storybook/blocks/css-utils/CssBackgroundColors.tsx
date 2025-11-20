import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import json from '../../../../packages/styles/docs/background.json'

export const CssBackgroundColors = () => (
  <CssUtilitiesTable
    list={json}
    search="background"
    example={item => <div className={`${item.class} p-small`}></div>}
  />
)
