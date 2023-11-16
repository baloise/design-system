import { BalInput } from './components'
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
  BalCheckbox,
  BalCheckboxButton,
  BalCheckboxGroup,
  BalContent,
  BalData,
  BalDataItem,
  BalDataLabel,
  BalDataValue,
  BalDate,
  BalDivider,
  BalField,
  BalFieldControl,
  BalFieldHint,
  BalFieldLabel,
  BalFieldMessage,
  BalFileUpload,
  BalFooter,
  BalForm,
  BalFormCol,
  BalFormGrid,
  BalHeading,
  BalHint,
  BalHintText,
  BalHintTitle,
  BalInputDate,
  BalInputGroup,
  BalInputSlider,
  BalInputStepper,
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
  BalNumberInput,
  BalRadio,
  BalRadioButton,
  BalRadioGroup,
  BalSelect,
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
  BalTextarea,
  BalTimeInput,
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

export const BalSelectBundle = [BalSelect, BalSelectOption]

export const BalCheckboxBundle = [BalCheckbox, BalCheckboxButton, BalCheckboxGroup]

export const BalRadioBundle = [BalRadio, BalRadioButton, BalRadioGroup]

export const BalFormGridBundle = [BalFormGrid, BalFormCol]

export const BalFieldBundle = [BalField, BalFieldLabel, BalFieldControl, BalFieldMessage, BalFieldControl, BalFieldHint]

/* Component Sections */

export const BalFormBundle = [
  ...BalFieldBundle,
  ...BalSelectBundle,
  ...BalCheckboxBundle,
  ...BalRadioBundle,
  ...BalFormGridBundle,
  BalForm,
  BalInput,
  BalInputDate,
  BalDate,
  BalFileUpload,
  BalInputGroup,
  BalInputSlider,
  BalInputStepper,
  BalNumberInput,
  BalTextarea,
  BalTimeInput,
  ...BalButtonBundle,
  BalNgErrorComponent,
]

export const BalLayoutBundle = [BalStack, BalContent, BalLogo, BalShape, BalApp, BalDivider, BalFooter]

export const BalTypographyBundle = [BalHeading, BalText, BalLabel]
