import {
  BalCheckbox,
  BalCheckboxGroup,
  BalDate,
  BalDatepicker,
  BalInput,
  BalInputDate,
  BalInputSlider,
  BalInputStepper,
  BalNumberInput,
  BalRadioGroup,
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
  BalCheckboxButton,
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
  BalRadio,
  BalRadioButton,
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
  BalTabItem,
  BalTabs,
  BalTag,
  BalTagGroup,
  BalText,
} from './generated/proxies'

export const BalAccordionBundle = [BalAccordion, BalAccordionDetails, BalAccordionSummary, BalAccordionTrigger]

export const BalButtonBundle = [BalButton, BalButtonGroup]

export const BalCardBundle = [BalCard, BalCardContent, BalCardTitle, BalCardActions, BalCardSubtitle, BalCardButton]

export const BalDataBundle = [BalData, BalDataItem, BalDataLabel, BalDataValue]

export const BalHintBundle = [BalHint, BalHintText, BalHintTitle]

export const BalCarouselBundle = [BalCarousel, BalCarouselItem]

export const BalListBundle = [
  BalList,
  BalListItem,
  BalListItemAccordionHead,
  BalListItemAccordionBody,
  BalListItemContent,
  BalListItemIcon,
  BalListItemTitle,
  BalListItemSubtitle,
]

export const BalNavbarBundle = [BalNavbar, BalNavbarBrand, BalNavbarMenu, BalNavbarMenuStart, BalNavbarMenuEnd]

export const BalStageBundle = [BalStage, BalStageBackLink, BalStageBody, BalStageFoot, BalStageHead, BalStageImage]

export const BalTagBundle = [BalTag, BalTagGroup]

export const BalTabsBundle = [BalTabs, BalTabItem]

export const BalStepsBundle = [BalSteps, BalStepItem]

export const BalModalBundle = [BalModal, BalModalBody, BalModalHeader]

export const BalSelectBundle = [BalSelectOption, BalSelect]

export const BalCheckboxBundle = [BalCheckbox, BalCheckboxGroup, BalCheckboxButton]

export const BalRadioBundle = [BalRadio, BalRadioButton, BalRadioGroup]

export const BalFormGridBundle = [BalFormGrid, BalFormCol]

export const BalFieldBundle = [BalField, BalFieldLabel, BalFieldControl, BalFieldMessage, BalFieldControl, BalFieldHint]

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
  BalDatepicker,
  BalInputDate,
  BalInputStepper,
  BalInputSlider,
  BalInput,
  BalNumberInput,
  ...BalRadioBundle,
  ...BalSelectBundle,
  BalTextarea,
  BalTimeInput,
]

export const BalLayoutBundle = [BalStack, BalContent, BalLogo, BalShape, BalApp, BalDivider, BalFooter]

export const BalTypographyBundle = [BalHeading, BalText, BalLabel]

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
  BalCheckboxButton,
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
  BalRadio,
  BalRadioButton,
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
  BalTabItem,
  BalTabs,
  BalTag,
  BalTagGroup,
  BalText,
  BalNgErrorComponent,
  BalCheckbox,
  BalCheckboxGroup,
  BalDate,
  BalDatepicker,
  BalInput,
  BalInputDate,
  BalInputSlider,
  BalInputStepper,
  BalNumberInput,
  BalRadioGroup,
  BalSelect,
  BalTextarea,
  BalTimeInput,
]
