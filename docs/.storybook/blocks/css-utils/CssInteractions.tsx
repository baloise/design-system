import React from 'react'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'
import json from '../../../../packages/styles/docs/interaction.json'

export const CssInteractionsCursor = () => <CssUtilitiesTable list={json} search="cursor" />
export const CssInteractionsUserSelect = () => <CssUtilitiesTable list={json} search="user-select" />
export const CssInteractionsPointerEvents = () => <CssUtilitiesTable list={json} search="pointer-events" />
