import {
  BalCheckbox,
  BalCheckboxGroup,
  BalDate,
  BalDropdown,
  BalFileUpload,
  BalInput,
  BalInputDate,
  BalInputSlider,
  BalInputStepper,
  BalNumberInput,
  BalRadioGroup,
  BalSegment,
  BalSelect,
  BalTextarea,
  BalTimeInput,
} from './components'
import { BalNgErrorComponent } from './directives/error.component'
import {
  BalAccordion,
  BalAccordionDetails,
  BalAccordionSummary,
  BalAccordionTrigger,
  BalApp,
  BalButton,
  BalButtonGroup,
  BalCard,
  BalCardActions,
  BalCardButton,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalCarousel,
  BalCarouselItem,
  BalCheck,
  BalContent,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalDivider,
  BalField,
  BalFieldControl,
  BalFieldHint,
  BalFieldLabel,
  BalFieldMessage,
  BalFooter,
  BalForm,
  BalFormCol,
  BalFormGrid,
  BalHeading,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInputGroup,
  BalLabel,
  BalList,
  BalListItem,
  BalListItemAccordionBody,
  BalListItemAccordionHead,
  BalListItemContent,
  BalListItemIcon,
  BalListItemSubtitle,
  BalListItemTitle,
  BalLogo,
  BalModal,
  BalModalBody,
  BalModalHeader,
  BalNavbar,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
  BalOption,
  BalOptionList,
  BalRadio,
  BalRadioIcon,
  BalSegmentItem,
  BalSelectOption,
  BalShape,
  BalStack,
  BalStage,
  BalStageBackLink,
  BalStageBody,
  BalStageFoot,
  BalStageHead,
  BalStageImage,
  BalStepItem,
  BalSteps,
  BalSwitch,
  BalTabItem,
  BalTabs,
  BalTag,
  BalTagGroup,
  BalText,
} from './generated/proxies'

export const BalAccordionBundle = [BalAccordion, BalAccordionDetails, BalAccordionSummary, BalAccordionTrigger] as const

export const BalButtonBundle = [BalButton, BalButtonGroup] as const

export const BalCardBundle = [
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalCardActions,
  BalCardSubtitle,
  BalCardButton,
] as const

export const BalDataBundle = [BalData, BalDataItem, BalDataLabel, BalDataValue] as const

export const BalHintBundle = [BalHint, BalHintText, BalHintTitle] as const

export const BalCarouselBundle = [BalCarousel, BalCarouselItem] as const

export const BalListBundle = [
  BalList,
  BalListItem,
  BalListItemAccordionHead,
  BalListItemAccordionBody,
  BalListItemContent,
  BalListItemIcon,
  BalListItemTitle,
  BalListItemSubtitle,
] as const

export const BalNavbarBundle = [BalNavbar, BalNavbarBrand, BalNavbarMenu, BalNavbarMenuStart, BalNavbarMenuEnd] as const

export const BalStageBundle = [
  BalStage,
  BalStageBackLink,
  BalStageBody,
  BalStageFoot,
  BalStageHead,
  BalStageImage,
] as const

export const BalTagBundle = [BalTag, BalTagGroup] as const

export const BalTabsBundle = [BalTabs, BalTabItem] as const

export const BalStepsBundle = [BalSteps, BalStepItem] as const

export const BalModalBundle = [BalModal, BalModalBody, BalModalHeader] as const

export const BalSelectBundle = [BalSelectOption, BalSelect] as const

export const BalCheckboxBundle = [BalCheckbox, BalCheckboxGroup, BalCheck, BalSwitch] as const

export const BalRadioBundle = [BalRadio, BalRadioIcon, BalRadioGroup] as const

export const BalFormGridBundle = [BalFormGrid, BalFormCol] as const

export const BalFieldBundle = [
  BalField,
  BalFieldLabel,
  BalFieldControl,
  BalFieldMessage,
  BalFieldControl,
  BalFieldHint,
] as const

export const BalDropdownBundle = [BalDropdown, BalOptionList, BalOption] as const

export const BalSegmentBundle = [BalSegment, BalSegmentItem] as const

/* Component Sections */

export const BalFormBundle = [
  //
  // Form Layout
  BalForm,
  BalInputGroup,
  ...BalFieldBundle,
  ...BalButtonBundle,
  ...BalFormGridBundle,
  BalNgErrorComponent,
  //
  // Form Controls
  ...BalCheckboxBundle,
  BalDate,
  ...BalDropdownBundle,
  BalInputDate,
  BalInputStepper,
  BalInputSlider,
  BalInput,
  BalNumberInput,
  ...BalRadioBundle,
  ...BalSelectBundle,
  ...BalSegmentBundle,
  BalFileUpload,
  BalTextarea,
  BalTimeInput,
] as const

export const BalLayoutBundle = [BalStack, BalContent, BalLogo, BalShape, BalApp, BalDivider, BalFooter] as const

export const BalTypographyBundle = [BalHeading, BalText, BalLabel] as const

export const BalComponentBundle = [
  BalAccordion,
  BalAccordionDetails,
  BalAccordionSummary,
  BalAccordionTrigger,
  BalApp,
  BalButton,
  BalButtonGroup,
  BalCard,
  BalCardActions,
  BalCardButton,
  BalCardContent,
  BalCardSubtitle,
  BalCardTitle,
  BalCarousel,
  BalCarouselItem,
  BalCheck,
  BalSwitch,
  BalContent,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalDivider,
  BalDropdown,
  BalOption,
  BalOptionList,
  BalField,
  BalFieldControl,
  BalFieldHint,
  BalFieldLabel,
  BalFieldMessage,
  BalFooter,
  BalForm,
  BalFormCol,
  BalFormGrid,
  BalHeading,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInputGroup,
  BalLabel,
  BalList,
  BalListItem,
  BalListItemAccordionBody,
  BalListItemAccordionHead,
  BalListItemContent,
  BalListItemIcon,
  BalListItemSubtitle,
  BalListItemTitle,
  BalLogo,
  BalModal,
  BalModalBody,
  BalModalHeader,
  BalNavbar,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
  BalRadio,
  BalRadioIcon,
  BalSelectOption,
  BalShape,
  BalStack,
  BalStage,
  BalStageBackLink,
  BalStageBody,
  BalStageFoot,
  BalStageHead,
  BalStageImage,
  BalStepItem,
  BalSteps,
  BalSegment,
  BalSegmentItem,
  BalFileUpload,
  BalTabItem,
  BalTabs,
  BalTag,
  BalTagGroup,
  BalText,
  BalNgErrorComponent,
  BalCheckbox,
  BalCheckboxGroup,
  BalDate,
  BalInput,
  BalInputDate,
  BalInputSlider,
  BalInputStepper,
  BalNumberInput,
  BalRadioGroup,
  BalSelect,
  BalTextarea,
  BalTimeInput,
] as const
