import type { Metadata } from 'next'
import { DsRootSSRProvider } from '@helvetia-design/react'

import '@helvetia-design/tokens/css/base'
import '@helvetia-design/styles/css/design-system'

export const metadata: Metadata = {
  title: 'ds-react Next.js SSR',
  description: 'SSR verification app for @helvetia-design/react',
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
