# TODO's for Claude

## Checklist improve Overview and Styling by using new storybook blocks for components

goal is to have all stories in a folder called Variants the the Variants page should be in that folde called Overview

- use accordion as reference
- Overview Page use:
  - <ComponentLead component="accordion" /> instead of the Lead
  - At the end of the page before the footer use <ComponentPublicMethods component="accordion" />
- Styling Page should be:
  - use <ComponentParts component="accordion" />
  - use <ComponentCssVariables component="accordion" />
  - use <ComponentDesignTokens component="accordion" />
  - remove everything else. should be like the accordion. see below

```md
<Meta title="Components/Accordion/Styling" />

<Banner label={'Styling'} section={ACCORDION_DOC_CONFIG.section} color={ACCORDION_DOC_CONFIG.color} />

<BannerTabs of={AccordionStories} tabs={getAccordionTabs('styling')}/>

<ComponentParts component="accordion" />

<ComponentCssVariables component="accordion" />

<ComponentDesignTokens component="accordion" />

<Footer />
```

| Component                              | Done |
| -------------------------------------- | ---- |
| accordion                              | ✅   |
| button                                 |      |
| badge                                  |      |
| heading                                |      |
| text                                   |      |
| label                                  |      |
| link                                   |      |
| stack                                  |      |
| divider                                |      |
| tag                                    |      |
| notification                           |      |
| card                                   |      |
| list                                   |      |
| icon                                   |      |
| spinner                                |      |
| logo                                   |      |
| close                                  |      |
| alert/toast                            |      |
| alert/snackbar                         |      |
| input                                  |      |
| textarea                               |      |
| radio                                  |      |
| checkbox                               |      |
| segment/segment + segment/segment-item |      |
| app                                    |      |
| number-input                           |      |
| progress-bar                           |      |
| pagination                             |      |
| content                                |      |
| shape                                  |      |
| toggle                                 |      |
