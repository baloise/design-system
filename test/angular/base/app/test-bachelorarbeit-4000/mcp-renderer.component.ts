import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { McpComponentNode } from './mcp.service'

@Component({
  selector: 'app-mcp-renderer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mcp-renderer.component.html',
})
export class McpRendererComponent {
  @Input() nodes: McpComponentNode[] = []
}
