/**
 * Public generated wrappers.
 *
 * Overlay wrappers with hand-authored replacements, and the renamed `ds-app`
 * root wrapper, stay public but are marked `@deprecated`. Prefer `Modal`,
 * `useToast`, `useSnackbar`, and `DsRoot`.
 */
export {
  DsAccordion,
  DsAppFooter,
  DsAppNavbar,
  DsBadge,
  DsBrandIcon,
  DsButton,
  DsButtonGroup,
  DsCard,
  DsCardActions,
  DsCardContent,
  DsCardHeader,
  DsCardSubtitle,
  DsCardTitle,
  DsCarousel,
  DsCarouselItem,
  DsCheckbox,
  DsCheckboxGroup,
  DsClose,
  DsContent,
  DsData,
  DsDataItem,
  DsDataLabel,
  DsDataValue,
  DsDate,
  DsDivider,
  DsDrawer,
  DsFileUpload,
  DsHeading,
  DsHint,
  DsHintText,
  DsHintTitle,
  DsIcon,
  DsInput,
  DsInputPhone,
  DsInputSlider,
  DsInputStepper,
  DsItem,
  DsLabel,
  DsList,
  DsLogo,
  DsModalBody,
  DsModalHeader,
  DsNotification,
  DsNumberInput,
  DsPagination,
  DsPopup,
  DsProgressBar,
  DsRadio,
  DsRadioGroup,
  DsRoot,
  DsSegment,
  DsSegmentItem,
  DsSelect,
  DsSelectOptgroup,
  DsSelectOption,
  DsShape,
  DsSheet,
  DsSpinner,
  DsStack,
  DsStep,
  DsStepPanel,
  DsSteps,
  DsTab,
  DsTabPanel,
  DsTabs,
  DsTag,
  DsTagGroup,
  DsText,
  DsTextarea,
  DsToggle,
  DsTooltip,
} from './generated/components'

/**
 * @deprecated Use `useToast` or `useSnackbar` instead. `DsAlertContainer` is the
 * internal overlay host those hooks already manage.
 */
export { DsAlertContainer } from './generated/components'

/**
 * @deprecated Use `DsRoot` instead. `DsApp` is a compatibility alias of the renamed root wrapper.
 */
export { DsApp } from './generated/components'

/**
 * @deprecated Use `Modal` instead. The generated wrapper does not keep React
 * `open` state in sync when the modal self-dismisses.
 */
export { DsModal } from './generated/components'

/**
 * @deprecated Use `useSnackbar` instead.
 */
export { DsSnackbar } from './generated/components'

/**
 * @deprecated Use `useToast` instead.
 */
export { DsToast } from './generated/components'
