#!/usr/bin/env node
// ============================================================
// AI Frontend Generator — MCP Server Entry Point
// Phase 2: get_components() implemented
// ============================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { getComponents } from './generators/registry.js'
import { validateLayout } from './validation/validator.js'
import { createFile } from './generators/file-creator.js'

const SERVER_NAME = 'ds-ai-frontend-generator'
const SERVER_VERSION = '0.1.0'

// ============================================================
// Server Initialization
// ============================================================

const server = new Server(
  {
    name: SERVER_NAME,
    version: SERVER_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
)

// ============================================================
// Tool Definitions (Schemas)
// ============================================================

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_components',
      description:
        'Returns all allowed Helvetia Design System components from tags-all.ts. ' +
        'Optionally filter by page type for token efficiency. ' +
        'Always call this first before generating any layout.',
      inputSchema: {
        type: 'object',
        properties: {
          pageType: {
            type: 'string',
            description:
              'Optional page type to filter relevant components. ' +
              'Accepted values: "form", "landing", "dashboard", "detail", "all"',
            enum: ['form', 'landing', 'dashboard', 'detail', 'all'],
          },
        },
        required: [],
      },
    },
    {
      name: 'validate_layout',
      description:
        'Validates a generated layout against Helvetia Design System rules. ' +
        'Checks component whitelist, nesting rules, page order, and single-stage rule. ' +
        'Returns a score (0-100) plus detailed errors and warnings. ' +
        'ALWAYS call this before create_file(). Score < 60 should trigger a retry.',
      inputSchema: {
        type: 'object',
        properties: {
          layout: {
            type: 'object',
            description: 'The layout object with a "layout" array of component nodes.',
            properties: {
              layout: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    component: { type: 'string' },
                    props: { type: 'object' },
                    children: { type: 'array' },
                    content: { type: 'string' },
                  },
                  required: ['component'],
                },
              },
            },
            required: ['layout'],
          },
        },
        required: ['layout'],
      },
    },
    {
      name: 'create_file',
      description:
        'Creates a file in the workspace at the specified path. ' +
        'For Angular output: creates both .component.html and .component.ts files. ' +
        'ONLY call this after validate_layout() returns a score >= 60.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description:
              'Target file path relative to workspace root. ' + 'Example: "src/app/pages/login/login.component.html"',
          },
          content: {
            type: 'string',
            description: 'The full file content to write.',
          },
          format: {
            type: 'string',
            description: 'Output format of the content.',
            enum: ['angular', 'html', 'json'],
          },
        },
        required: ['path', 'content', 'format'],
      },
    },
  ],
}))

// ============================================================
// Tool Handlers (Phase 2+3+4: all tools implemented)
// ============================================================

server.setRequestHandler(CallToolRequestSchema, async request => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'get_components': {
      const pageType = (args as Record<string, unknown>)?.pageType as string | undefined
      const result = getComponents(pageType)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    }

    case 'validate_layout': {
      const layout = (args as Record<string, unknown>)?.layout
      if (!layout || typeof layout !== 'object') {
        throw new Error('validate_layout requires a "layout" object with a "layout" array.')
      }
      const result = validateLayout(layout as import('./types/index.js').Layout)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    }

    case 'create_file': {
      const a = args as Record<string, unknown>
      const path = a?.path as string | undefined
      const content = a?.content as string | undefined
      const format = (a?.format as string | undefined) ?? 'angular'

      if (!path) throw new Error('create_file requires a "path" argument.')
      if (!content) throw new Error('create_file requires a "content" argument.')
      if (!['angular', 'html', 'json'].includes(format)) {
        throw new Error('create_file "format" must be one of: angular, html, json.')
      }

      const result = createFile(path, content, format as import('./types/index.js').OutputFormat)
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

// ============================================================
// Server Startup
// ============================================================

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)

  // Log to stderr (stdout is reserved for MCP protocol)
  console.error(`[${SERVER_NAME}] MCP Server v${SERVER_VERSION} started`)
  console.error(`[${SERVER_NAME}] Tools ready: get_components ✅  validate_layout ✅  create_file ✅`)
  console.error(`[${SERVER_NAME}] Phase 4 complete — all tools implemented`)
}

main().catch(error => {
  console.error(`[${SERVER_NAME}] Fatal error:`, error)
  process.exit(1)
})
