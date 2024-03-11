import React from 'react'
import json from '../../../../packages/styles/docs/sizing.json'
import { CssUtilitiesTable } from './helpers/CssPropertyTable'

export const CssSizingHeight = () => <CssUtilitiesTable list={json} search="height" />
export const CssSizingMinHeight = () => <CssUtilitiesTable list={json} search="min-height" />
export const CssSizingMaxHeight = () => <CssUtilitiesTable list={json} search="max-height" />
export const CssSizingWidth = () => <CssUtilitiesTable list={json} search="width" />
export const CssSizingMinWidth = () => <CssUtilitiesTable list={json} search="min-width" />
export const CssSizingMaxWidth = () => <CssUtilitiesTable list={json} search="max-width" />
