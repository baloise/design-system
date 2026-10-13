import compression from 'compression'
import express from 'express'
import { renderToString } from '@helvetia-design/core/hydrate'

// Server-rendered fragment: real markup for every ds-* custom element, already inside a
// declarative shadow root, before any client-side JavaScript runs.
const fragment = `
  <ds-root>
    <main class="ds-container mt-base">
      <h1 class="ds-heading" data-testid="heading">Hello World</h1>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
         <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-button data-testid="button">Button</ds-button>
      <ds-input data-testid="input" name="ssr-input" label="Name"></ds-input>
      <ds-checkbox data-testid="checkbox">Accept</ds-checkbox>
      <ds-button id="tooltip-trigger">Hover me</ds-button>
      <ds-tooltip data-testid="tooltip" reference="tooltip-trigger">Hint</ds-tooltip>
    </main>
  </ds-root>
`

async function renderPage(): Promise<string> {
  const { html } = await renderToString(fragment, {
    fullDocument: false,
    prettyHtml: true,
    serializeShadowRoot: 'declarative-shadow-dom',
  })

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>42</title>
    <meta name="description" content="SSR integration harness for the Helvetia Design System." />
    <link rel="stylesheet" href="/assets/base.tokens.css" />
    <link rel="stylesheet" href="/assets/design-system.min.css" />
  </head>
  <body>
    ${html}
    <script type="module" src="/assets/design-system/design-system.esm.js"></script>
  </body>
</html>
`
}

const app = express()

app.use(compression())

app.get('/', async (_req, res) => {
  res.type('html').send(await renderPage())
})

// `pnpm copy-assets` stages everything the client needs — the design-system JS
// chunks plus the tokens/styles CSS — into public, served as-is below. These
// filenames aren't content-hashed, so a year-long immutable cache means a
// client who visited before a design-system upgrade won't see new bytes
// until the cache expires or they hard-refresh. Acceptable for this demo
// harness; a real deployment would fingerprint these filenames instead.
app.use('/assets', express.static('public', { maxAge: '1y', immutable: true }))

const port = Number(process.env.PORT ?? 3100)
app.listen(port, () => {
  console.log(`integration-ssr listening on http://localhost:${port}`)
})
