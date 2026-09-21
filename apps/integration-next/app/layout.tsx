import type { Metadata } from 'next'
import { ClientInit } from './client-init'

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
        <ClientInit />
        <nav>
          <a href="/">SSR</a>
          {' · '}
          <a href="/overlays">Overlays</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
