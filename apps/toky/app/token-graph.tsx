'use client'

import { useMemo } from 'react'
import { Graph, layout as dagreLayout } from '@dagrejs/dagre'
import { Background, Controls, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import type { Edge, Node, NodeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatValue, getColorHex, toSlashPath } from '@/src/tokens/format'
import { buildConsumerTree } from '@/src/tokens/graph'
import type { GraphNode } from '@/src/tokens/graph'
import type { FlatToken, TokenLayer } from '@/src/tokens/types'

const NODE_WIDTH = 200
const NODE_HEIGHT = 78

const LAYER_BORDER_COLOR: Record<TokenLayer, string> = {
  Global: '#f59e0b', // amber
  Alias: '#38bdf8', // sky
  Component: '#34d399', // emerald
}

const ROOT_BACKGROUND_COLOR = '#a855f733' // light purple
const NODE_BACKGROUND_COLOR = '#18181b' // matches the dark canvas

interface TokenNodeData {
  firstName: string
  rest: string
  layer: TokenLayer
  isRoot: boolean
  valueText: string
  hex: string | null
  [key: string]: unknown
}

function TokenNode({ data }: NodeProps<Node<TokenNodeData>>) {
  const borderColor = LAYER_BORDER_COLOR[data.layer]

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md border-2 px-3 py-2"
      style={{
        borderColor,
        backgroundColor: data.isRoot ? ROOT_BACKGROUND_COLOR : NODE_BACKGROUND_COLOR,
      }}
    >
      <span
        className="absolute top-1 right-1 rounded-full border px-1.5 py-0.5 text-[9px] leading-none font-medium"
        style={{ borderColor, color: borderColor }}
      >
        {data.layer}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="pr-14 text-base leading-tight font-bold text-foreground">{data.firstName}</span>
        {data.rest && <span className="text-xs text-muted-foreground">{data.rest}</span>}
      </div>
      <div className="mt-1 flex items-center gap-1.5 rounded bg-zinc-500/25 px-1.5 py-1 text-[8px] text-foreground">
        {data.hex && (
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-sm border"
            style={{ backgroundColor: data.hex }}
          />
        )}
        <span className="truncate">{data.valueText}</span>
      </div>
      <Handle type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}

const NODE_TYPES = { token: TokenNode }

function layoutNodes(
  nodes: GraphNode[],
  edges: { source: string; target: string }[],
): Map<string, { x: number; y: number }> {
  const graph = new Graph()
  // Vertical (bottom-to-top): the selected token sits at the bottom, its
  // consumers stack in rows above it.
  graph.setGraph({ rankdir: 'BT', nodesep: 32, ranksep: 64 })
  graph.setDefaultEdgeLabel(() => ({}))

  for (const node of nodes) {
    graph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  }
  for (const edge of edges) {
    graph.setEdge(edge.source, edge.target)
  }

  dagreLayout(graph)

  const positions = new Map<string, { x: number; y: number }>()
  for (const node of nodes) {
    const { x, y } = graph.node(node.id)
    positions.set(node.id, { x, y })
  }
  return positions
}

export function TokenGraph({
  tokens,
  rootPath,
  onClose,
}: {
  tokens: FlatToken[]
  rootPath: string
  onClose: () => void
}) {
  const { nodes: graphNodes, edges: graphEdges } = useMemo(
    () => buildConsumerTree(tokens, rootPath),
    [tokens, rootPath],
  )

  const tokenById = useMemo(() => new Map(tokens.map(token => [token.path.join('.'), token])), [tokens])

  const positions = useMemo(() => layoutNodes(graphNodes, graphEdges), [graphNodes, graphEdges])

  const flowNodes: Node[] = graphNodes.map(node => {
    const [firstName, ...restParts] = node.name.split('.')
    const token = tokenById.get(node.id)
    const referencedToken = token?.referenceTarget ? tokenById.get(token.referenceTarget) : undefined
    const isReference = Boolean(token?.referenceTarget)
    const hex = !isReference && token?.type === 'color' ? getColorHex(token?.resolvedValue) : null
    const valueText = isReference
      ? toSlashPath(referencedToken?.name ?? token!.referenceTarget!)
      : formatValue(token?.resolvedValue)
    return {
      id: node.id,
      type: 'token',
      position: positions.get(node.id) ?? { x: 0, y: 0 },
      data: {
        firstName,
        rest: restParts.join('/'),
        layer: node.layer,
        isRoot: node.id === rootPath,
        valueText,
        hex,
      },
      style: { width: NODE_WIDTH, height: NODE_HEIGHT },
      draggable: false,
    }
  })

  const flowEdges: Edge[] = graphEdges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    // Step routing — right-angle bends between the bottom/top handles above,
    // instead of a straight diagonal line, so the flow reads naturally
    // rather than a tangle of crossing lines once a node has many consumers.
    type: 'smoothstep',
    style: { stroke: '#ffffff', strokeWidth: 2.5, strokeDasharray: '6 4' },
  }))

  const hasConnections = graphNodes.length > 1

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent
        aria-label={`Reference graph for ${rootPath}`}
        className="inset-6 flex h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] translate-x-0 translate-y-0 flex-col sm:max-w-[calc(100vw-3rem)]"
      >
        <DialogHeader>
          <DialogTitle>Relations of {toSlashPath(rootPath)}</DialogTitle>
        </DialogHeader>

        {!hasConnections ? (
          <p className="text-sm text-muted-foreground">
            This token has no references — it neither points at another token nor is pointed at by one.
          </p>
        ) : (
          <div className="min-h-0 flex-1">
            <ReactFlowProvider>
              <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={NODE_TYPES}
                nodesDraggable={false}
                fitView
                colorMode="dark"
              >
                <Background />
                <Controls />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
