import type { Metadata } from 'next'
import { DsRootSSRProvider } from '@baloise/ds-react'

import '@baloise/ds-tokens/css/base'
import '@baloise/ds-styles/css/design-system'

export const metadata: Metadata = {
  title: 'ds-react Next.js SSR',
  description: 'SSR verification app for @baloise/ds-react',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DsRootSSRProvider animated={false}>
          <nav>
            <a href="/">SSR</a>
            {' · '}
            <a href="/overlays">Overlays</a>
          </nav>
          {children}
        </DsRootSSRProvider>
      </body>
    </html>
  )
}
