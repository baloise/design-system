#!/usr/bin/env npx tsx

/**
 * Figma Token Upload Script
 *
 * This script uploads design tokens to Figma using the Figma Variables REST API.
 * It reads your token JSON files and creates/updates Figma variables and collections.
 *
 * Prerequisites:
 * 1. Create a Figma Personal Access Token: https://www.figma.com/developers/api#access-tokens
 * 2. Set environment variables (in .env file or shell):
 *    - FIGMA_ACCESS_TOKEN: Your Figma personal access token
 *    - FIGMA_FILE_ID: The Figma file ID where tokens will be uploaded
 *
 * Usage:
 *   npx tsx scripts/upload-to-figma.ts
 *
 * Or with environment variables:
 *   FIGMA_ACCESS_TOKEN=xxx FIGMA_FILE_ID=xxx npx tsx scripts/upload-to-figma.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file if it exists
const envPath = path.resolve(__dirname, '../.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      const value = valueParts.join('=').trim()
      if (key && value && !process.env[key]) {
        process.env[key] = value
      }
    }
  }
}

// ============================================================================
// Types
// ============================================================================

interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

interface FigmaVariableValue {
  type: 'VARIABLE_ALIAS'
  id: string
}

type FigmaValue = number | string | boolean | FigmaColor | FigmaVariableValue

interface FigmaVariableCreate {
  name: string
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'
  scopes?: string[]
  codeSyntax?: {
    WEB?: string
    ANDROID?: string
    iOS?: string
  }
  description?: string
}

interface FigmaVariableUpdate {
  id: string
  name?: string
  description?: string
  codeSyntax?: {
    WEB?: string
    ANDROID?: string
    iOS?: string
  }
}

interface FigmaVariableModeValue {
  variableId: string
  modeId: string
  value: FigmaValue
}

interface FigmaVariableCollectionCreate {
  name: string
  initialModeId?: string
}

interface FigmaVariableCollectionUpdate {
  id: string
  name?: string
}

interface FigmaModeCreate {
  name: string
  variableCollectionId: string
}

interface FigmaModeUpdate {
  id: string
  name?: string
}

interface FigmaPostVariablesPayload {
  variableCollections?: FigmaVariableCollectionCreate[]
  variableCollectionUpdates?: FigmaVariableCollectionUpdate[]
  variableModes?: FigmaModeCreate[]
  variableModeUpdates?: FigmaModeUpdate[]
  variables?: (FigmaVariableCreate & { variableCollectionId: string })[]
  variableUpdates?: FigmaVariableUpdate[]
  variableModeValues?: FigmaVariableModeValue[]
}

interface FigmaLocalVariable {
  id: string
  name: string
  key: string
  variableCollectionId: string
  resolvedType: string
  valuesByMode: Record<string, FigmaValue>
  remote: boolean
  description: string
  hiddenFromPublishing: boolean
  scopes: string[]
  codeSyntax: {
    WEB?: string
    ANDROID?: string
    iOS?: string
  }
}

interface FigmaVariableCollection {
  id: string
  name: string
  key: string
  modes: { modeId: string; name: string }[]
  defaultModeId: string
  remote: boolean
  hiddenFromPublishing: boolean
  variableIds: string[]
}

interface FigmaGetVariablesResponse {
  status: number
  error: boolean
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>
    variables: Record<string, FigmaLocalVariable>
  }
}

interface TokenValue {
  $value: string | number | string[] | Record<string, unknown> | unknown[]
  $type?: string
  comment?: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup | string
}

// ============================================================================
// Configuration
// ============================================================================

/**
 * Extract file ID from a Figma URL or return the ID if already clean
 * Handles URLs like:
 * - https://www.figma.com/file/7a2g9pXkOH6LFc2RT0Q8kj/File-Name
 * - https://www.figma.com/design/7a2g9pXkOH6LFc2RT0Q8kj/File-Name
 * - 7a2g9pXkOH6LFc2RT0Q8kj
 */
function parseFileId(input: string): string {
  // If it looks like a clean file ID (alphanumeric), return as-is
  if (/^[a-zA-Z0-9]+$/.test(input)) {
    return input
  }

  // Try to extract from URL pattern
  const match = input.match(/(?:file|design)\/([a-zA-Z0-9]+)/)
  if (match) {
    return match[1]
  }

  // If it contains a slash but no URL pattern, take the first segment
  if (input.includes('/')) {
    return input.split('/')[0]
  }

  return input
}

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN || ''
const FIGMA_FILE_ID_RAW = process.env.FIGMA_FILE_ID || ''
const FIGMA_FILE_ID = parseFileId(FIGMA_FILE_ID_RAW)
const TOKENS_DIR = path.resolve(__dirname, '../tokens')

// Collection names for organizing tokens
const COLLECTION_NAMES = {
  COLOR: 'Color',
  SIZE: 'Size',
  TYPOGRAPHY: 'Typography',
  SHADOW: 'Shadow',
  ANIMATION: 'Animation',
} as const

// ============================================================================
// Figma API Client
// ============================================================================

class FigmaApiClient {
  private baseUrl = 'https://api.figma.com/v1'
  private accessToken: string
  private fileId: string

  constructor(accessToken: string, fileId: string) {
    this.accessToken = accessToken
    this.fileId = fileId
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Figma-Token': this.accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Figma API error: ${response.status} ${response.statusText}\n${errorBody}`)
    }

    return response.json() as Promise<T>
  }

  async getLocalVariables(): Promise<FigmaGetVariablesResponse> {
    return this.request<FigmaGetVariablesResponse>(`/files/${this.fileId}/variables/local`)
  }

  async postVariables(payload: FigmaPostVariablesPayload): Promise<void> {
    await this.request(`/files/${this.fileId}/variables`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
}

// ============================================================================
// Token Parsing Utilities
// ============================================================================

/**
 * Parse a hex color string to Figma color format (0-1 range)
 */
function hexToFigmaColor(hex: string): FigmaColor {
  // Remove # if present
  hex = hex.replace('#', '')

  // Handle shorthand hex (e.g., #FFF)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('')
  }

  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1

  return { r, g, b, a }
}

/**
 * Parse rgba color string to Figma color format
 */
function rgbaToFigmaColor(rgba: string): FigmaColor {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) {
    throw new Error(`Invalid rgba color: ${rgba}`)
  }

  return {
    r: parseInt(match[1]) / 255,
    g: parseInt(match[2]) / 255,
    b: parseInt(match[3]) / 255,
    a: match[4] ? parseFloat(match[4]) : 1,
  }
}

/**
 * Parse any color string to Figma color format
 */
function parseColor(value: string): FigmaColor {
  // Handle named colors
  if (value === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 }
  }
  if (value === 'white') {
    return { r: 1, g: 1, b: 1, a: 1 }
  }
  if (value === 'black') {
    return { r: 0, g: 0, b: 0, a: 1 }
  }

  if (value.startsWith('#')) {
    return hexToFigmaColor(value)
  } else if (value.startsWith('rgb')) {
    return rgbaToFigmaColor(value)
  }
  throw new Error(`Unsupported color format: ${value}`)
}

/**
 * Parse a size value (e.g., "16px", "1rem", "16", "-999999") to a number
 */
function parseSizeValue(value: string | number): number {
  if (typeof value === 'number') {
    return value
  }

  // Remove units and parse (support negative numbers)
  const numMatch = value.match(/^(-?[\d.]+)/)
  if (numMatch) {
    return parseFloat(numMatch[1])
  }

  throw new Error(`Cannot parse size value: ${value}`)
}

/**
 * Check if a value is a token reference (e.g., "{color.primary.5}")
 */
function isTokenReference(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('{') && value.endsWith('}')
}

/**
 * Convert token reference to Figma variable name
 * e.g., "{color.primary.5}" -> "color/primary/5"
 */
function tokenRefToVariableName(ref: string): string {
  // Remove { and } and replace . with /
  return ref.slice(1, -1).replace(/\./g, '/')
}

// ============================================================================
// Token Processing
// ============================================================================

interface ProcessedToken {
  name: string
  value: FigmaValue | null
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'
  description?: string
  isReference: boolean
  referenceName?: string
  codeSyntax?: string
}

interface ProcessedCollection {
  name: string
  tokens: ProcessedToken[]
}

/**
 * Flatten nested token object into array of processed tokens
 */
function flattenTokens(obj: TokenGroup, prefix: string[] = [], type?: string): ProcessedToken[] {
  const tokens: ProcessedToken[] = []

  for (const [key, value] of Object.entries(obj)) {
    // Skip $type at group level
    if (key === '$type') {
      type = value as string
      continue
    }

    const currentPath = [...prefix, key]

    // Check if this is a token value (has $value)
    if (value && typeof value === 'object' && '$value' in value) {
      const tokenValue = value as TokenValue
      const tokenType = tokenValue.$type || type
      const rawValue = tokenValue.$value

      let processedToken: ProcessedToken

      // Check if it's a reference
      if (isTokenReference(rawValue)) {
        processedToken = {
          name: currentPath.join('/'),
          value: null,
          resolvedType: determineResolvedType(tokenType),
          description: tokenValue.comment,
          isReference: true,
          referenceName: tokenRefToVariableName(rawValue as string),
        }
      } else {
        processedToken = {
          name: currentPath.join('/'),
          value: parseTokenValue(rawValue, tokenType),
          resolvedType: determineResolvedType(tokenType),
          description: tokenValue.comment,
          isReference: false,
        }
      }

      // Add CSS variable name as code syntax
      processedToken.codeSyntax = `--bal-${currentPath.join('-')}`

      tokens.push(processedToken)
    } else if (value && typeof value === 'object') {
      // Recurse into nested objects
      tokens.push(...flattenTokens(value as TokenGroup, currentPath, type))
    }
  }

  return tokens
}

/**
 * Determine Figma resolved type from token type
 */
function determineResolvedType(type?: string): 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR' {
  switch (type) {
    case 'color':
      return 'COLOR'
    case 'dimension':
    case 'number':
    case 'opacity':
      return 'FLOAT'
    case 'fontFamily':
    case 'cubicBezier':
      return 'STRING'
    default:
      return 'STRING'
  }
}

/**
 * Parse token value to Figma value
 */
function parseTokenValue(
  value: string | number | string[] | Record<string, unknown> | unknown[],
  type?: string,
): FigmaValue {
  if (type === 'color') {
    if (typeof value === 'string') {
      return parseColor(value)
    }
  }

  if (type === 'dimension' || type === 'number') {
    if (typeof value === 'string' || typeof value === 'number') {
      return parseSizeValue(value)
    }
  }

  if (type === 'opacity') {
    return typeof value === 'number' ? value : parseFloat(value as string)
  }

  if (type === 'fontFamily' && Array.isArray(value)) {
    return (value as string[]).join(', ')
  }

  if (type === 'cubicBezier' && Array.isArray(value)) {
    return `cubic-bezier(${(value as number[]).join(', ')})`
  }

  // Default to string representation
  return String(value)
}

/**
 * Read and process all token files
 */
function processTokenFiles(): ProcessedCollection[] {
  const collections: ProcessedCollection[] = []

  // Process color tokens
  const colorDir = path.join(TOKENS_DIR, 'color')
  if (fs.existsSync(colorDir)) {
    const colorTokens: ProcessedToken[] = []
    const colorFiles = fs.readdirSync(colorDir).filter(f => f.endsWith('.json'))

    for (const file of colorFiles) {
      const filePath = path.join(colorDir, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      colorTokens.push(...flattenTokens(content))
    }

    collections.push({
      name: COLLECTION_NAMES.COLOR,
      tokens: colorTokens,
    })
  }

  // Process size tokens
  const sizeDir = path.join(TOKENS_DIR, 'size')
  if (fs.existsSync(sizeDir)) {
    const sizeTokens: ProcessedToken[] = []
    const sizeFiles = fs.readdirSync(sizeDir).filter(f => f.endsWith('.json'))

    for (const file of sizeFiles) {
      const filePath = path.join(sizeDir, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      sizeTokens.push(...flattenTokens(content))
    }

    collections.push({
      name: COLLECTION_NAMES.SIZE,
      tokens: sizeTokens,
    })
  }

  // Process animation tokens
  const animationFile = path.join(TOKENS_DIR, 'animation.json')
  if (fs.existsSync(animationFile)) {
    const content = JSON.parse(fs.readFileSync(animationFile, 'utf-8'))
    collections.push({
      name: COLLECTION_NAMES.ANIMATION,
      tokens: flattenTokens(content),
    })
  }

  // Process font tokens
  const fontFile = path.join(TOKENS_DIR, 'font.json')
  if (fs.existsSync(fontFile)) {
    const content = JSON.parse(fs.readFileSync(fontFile, 'utf-8'))
    collections.push({
      name: COLLECTION_NAMES.TYPOGRAPHY,
      tokens: flattenTokens(content),
    })
  }

  // Process shadow tokens (box shadows are complex, stored as strings)
  const shadowFile = path.join(TOKENS_DIR, 'shadow.json')
  if (fs.existsSync(shadowFile)) {
    // Note: Figma doesn't have native shadow variable support
    // We'll skip these or store them as strings for reference
    console.log('⚠️  Shadow tokens are not fully supported by Figma Variables API')
  }

  return collections
}

// ============================================================================
// Figma Variable Sync
// ============================================================================

interface VariableNameMap {
  [name: string]: string // name -> id
}

interface CollectionInfo {
  id: string
  defaultModeId: string
  variableNameMap: VariableNameMap
}

/**
 * Get existing collections and variables from Figma
 */
async function getExistingVariables(client: FigmaApiClient): Promise<Map<string, CollectionInfo>> {
  const response = await client.getLocalVariables()
  const collectionMap = new Map<string, CollectionInfo>()

  for (const [collectionId, collection] of Object.entries(response.meta.variableCollections)) {
    const variableNameMap: VariableNameMap = {}

    // Map variable names to IDs
    for (const variableId of collection.variableIds) {
      const variable = response.meta.variables[variableId]
      if (variable) {
        variableNameMap[variable.name] = variable.id
      }
    }

    collectionMap.set(collection.name, {
      id: collectionId,
      defaultModeId: collection.defaultModeId,
      variableNameMap,
    })
  }

  return collectionMap
}

/**
 * Create or update variables in Figma
 */
async function syncVariablesToFigma(client: FigmaApiClient, collections: ProcessedCollection[]): Promise<void> {
  console.log('📊 Fetching existing Figma variables...')
  const existingCollections = await getExistingVariables(client)

  const payload: FigmaPostVariablesPayload = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  }

  // Track temporary IDs for new collections
  const tempCollectionIds: Map<string, string> = new Map()
  let tempIdCounter = 0

  for (const collection of collections) {
    console.log(`\n📁 Processing collection: ${collection.name}`)
    console.log(`   Found ${collection.tokens.length} tokens`)

    let collectionInfo = existingCollections.get(collection.name)
    let collectionId: string
    let modeId: string

    if (!collectionInfo) {
      // Create new collection
      const tempId = `temp_collection_${tempIdCounter++}`
      tempCollectionIds.set(collection.name, tempId)

      payload.variableCollections!.push({
        name: collection.name,
        initialModeId: `temp_mode_${tempId}`,
      })

      collectionId = tempId
      modeId = `temp_mode_${tempId}`
      console.log(`   ➕ Will create new collection`)
    } else {
      collectionId = collectionInfo.id
      modeId = collectionInfo.defaultModeId
      console.log(`   ✅ Collection exists`)
    }

    // Process tokens
    for (const token of collection.tokens) {
      const existingVariableId = collectionInfo?.variableNameMap[token.name]

      if (existingVariableId) {
        // Update existing variable value
        if (!token.isReference && token.value !== null) {
          payload.variableModeValues!.push({
            variableId: existingVariableId,
            modeId: modeId,
            value: token.value,
          })
        }
      } else {
        // Create new variable
        const variableTempId = `temp_var_${tempIdCounter++}`

        payload.variables!.push({
          name: token.name,
          variableCollectionId: collectionId,
          resolvedType: token.resolvedType,
          description: token.description,
          codeSyntax: token.codeSyntax
            ? {
                WEB: token.codeSyntax,
              }
            : undefined,
        })

        // Note: We can't set initial values for new variables in the same request
        // when using references. Need to do this in a follow-up request.
        if (!token.isReference && token.value !== null) {
          payload.variableModeValues!.push({
            variableId: variableTempId,
            modeId: modeId,
            value: token.value,
          })
        }
      }
    }
  }

  // Send the payload if there's anything to update
  const hasUpdates =
    (payload.variableCollections?.length ?? 0) > 0 ||
    (payload.variables?.length ?? 0) > 0 ||
    (payload.variableModeValues?.length ?? 0) > 0

  if (hasUpdates) {
    console.log('\n🚀 Uploading to Figma...')
    console.log(`   Collections: ${payload.variableCollections?.length ?? 0} new`)
    console.log(`   Variables: ${payload.variables?.length ?? 0} new`)
    console.log(`   Values: ${payload.variableModeValues?.length ?? 0} to update`)

    try {
      await client.postVariables(payload)
      console.log('\n✅ Successfully uploaded tokens to Figma!')
    } catch (error) {
      console.error('\n❌ Failed to upload tokens:', error)
      throw error
    }
  } else {
    console.log('\n✅ All tokens are already up to date!')
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('🎨 Baloise Design System - Figma Token Upload\n')

  // Validate environment variables
  if (!FIGMA_ACCESS_TOKEN) {
    console.error('❌ Missing FIGMA_ACCESS_TOKEN environment variable')
    console.log('\nTo get your access token:')
    console.log('1. Go to Figma > Settings > Account')
    console.log('2. Scroll to "Personal access tokens"')
    console.log('3. Create a new token with "File content" scope\n')
    process.exit(1)
  }

  if (!FIGMA_FILE_ID) {
    console.error('❌ Missing FIGMA_FILE_ID environment variable')
    console.log('\nTo get your file ID:')
    console.log('1. Open your Figma file in the browser')
    console.log('2. Copy the ID from the URL: figma.com/file/[FILE_ID]/...\n')
    process.exit(1)
  }

  console.log(`📁 Target Figma file: ${FIGMA_FILE_ID}`)

  // Process token files
  console.log('📖 Reading token files...')
  const collections = processTokenFiles()

  const totalTokens = collections.reduce((sum, c) => sum + c.tokens.length, 0)
  console.log(`   Found ${collections.length} collections with ${totalTokens} tokens total`)

  // Upload to Figma
  const client = new FigmaApiClient(FIGMA_ACCESS_TOKEN, FIGMA_FILE_ID)
  await syncVariablesToFigma(client, collections)
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
