import { NextResponse } from 'next/server'
import { getFigmaVariables, requireFigmaApiToken, requireFigmaFileKey } from '@/src/tokens/figma'

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error'
}

// Thin, secret-holding proxy only — the Figma token never reaches the
// browser. All matching/diffing runs client-side in src/tokens/figma-pull.ts
// against the raw meta this route returns (see docs/adr/0002).
export async function GET(): Promise<Response> {
  let token: string
  let fileKey: string
  try {
    token = requireFigmaApiToken()
    fileKey = requireFigmaFileKey()
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 })
  }

  try {
    const meta = await getFigmaVariables(fileKey, token)
    return NextResponse.json(meta, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 502 })
  }
}
