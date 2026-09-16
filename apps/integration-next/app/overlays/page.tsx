'use client'

import dynamic from 'next/dynamic'

// Overlay controllers and generated wrappers need `window` / custom-element
// upgrade. Disable SSR so Next does not evaluate that graph in Node.
const OverlaysDemo = dynamic(() => import('./overlays-demo'), { ssr: false })

export default function OverlaysPage() {
  return <OverlaysDemo />
}
