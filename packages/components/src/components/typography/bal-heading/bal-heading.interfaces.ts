/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../interfaces.d.ts" />

namespace BalProps {
  export type BalHeadingVisualLevel =
    | 'display'
    | 'display-2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'xxxxx-large'
    | 'xxxx-large'
    | 'xxx-large'
    | 'xx-large'
    | 'x-large'
    | 'large'
    | 'medium'
    | 'normal'
  export type BalHeadingLevel = BalHeadingVisualLevel | 'span' | 'p'
  export type BalHeadingColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | '' | 'blue' | 'white'
}
