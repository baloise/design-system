import { Injectable } from '@angular/core'

export interface McpComponentNode {
  type: string
  props?: Record<string, any>
  children?: McpComponentNode[]
}

export interface McpValidationResult {
  valid: boolean
  errors: string[]
}

@Injectable({ providedIn: 'root' })
export class McpService {

  /** Erlaubte Design-System-Komponenten */
  private readonly allowedTypes = new Set<string>([
    'bal-page',
    'bal-logo',
    'bal-heading',
    'bal-text',
    'bal-card',
    'bal-card-header',
    'bal-card-title',
    'bal-card-content',
    'bal-field',
    'bal-field-label',
    'bal-field-control',
    'bal-input',
    'bal-textarea',
    'bal-button',
    'bal-grid',
    'bal-grid-column',
    'bal-footer',
  ])

  /** Parent-Child-Regeln (Struktur-Governance) */
  private readonly structureRules: Record<string, string[]> = {
    'bal-page': [],
    'bal-logo': ['bal-page'],
    'bal-grid': ['bal-page', 'bal-footer'],
    'bal-grid-column': ['bal-grid'],
    'bal-card': ['bal-grid-column'],
    'bal-card-header': ['bal-card'],
    'bal-card-title': ['bal-card-header'],
    'bal-card-content': ['bal-card'],
    'bal-field': ['bal-card-content'],
    'bal-field-label': ['bal-field'],
    'bal-field-control': ['bal-field'],
    'bal-input': ['bal-field-control'],
    'bal-textarea': ['bal-field-control'],
    'bal-button': ['bal-card-content', 'bal-page', 'bal-footer'],
    'bal-heading': ['bal-card-content', 'bal-grid-column', 'bal-footer'],
    'bal-text': ['bal-card-content', 'bal-grid-column', 'bal-footer'],
    'bal-footer': ['bal-page'],
  }

  /** Strenger KI-Prompt */
  buildPrompt(): string {
    return `
Du erzeugst KEIN HTML und KEIN CSS.
Du gibst ausschließlich JSON im folgenden Schema zurück:

{
  "type": "bal-*",
  "props": {},
  "children": []
}

Erlaubte Komponenten:
${Array.from(this.allowedTypes).join(', ')}

Keine anderen Tags.
Keine CSS-Klassen.
Jede Struktur wird validiert.
`
  }

  /** Öffentliche Validierung */
  validate(nodes: McpComponentNode[]): McpValidationResult {
    const errors: string[] = []
    nodes.forEach(node => this.validateNode(node, null, errors))
    return { valid: errors.length === 0, errors }
  }

  /** Rekursive Governance-Validierung */
  private validateNode(
    node: McpComponentNode,
    parentType: string | null,
    errors: string[]
  ): void {
    if (!this.allowedTypes.has(node.type)) {
      errors.push(`❌ Nicht erlaubte Komponente: ${node.type}`)
      return
    }

    const allowedParents = this.structureRules[node.type]
    if (allowedParents && parentType && !allowedParents.includes(parentType)) {
      errors.push(
        `❌ Ungültige Struktur: ${node.type} darf nicht in ${parentType} liegen`
      )
    }

    node.children?.forEach(child =>
      this.validateNode(child, node.type, errors)
    )
  }
}
``
