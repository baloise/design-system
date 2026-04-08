/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type HeadingVisualLevel =
    | 'display'
    | 'display-2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | '5xl'
    | '4xl'
    | '3xl'
    | '2xl'
    | 'xl'
    | 'lg'
    | 'md'
    | 'base'
  export type HeadingLevel = HeadingVisualLevel | 'span' | 'p'
  export type HeadingColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | '' | 'blue' | 'white'
}
