import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BalModalService, balImports } from '../design-system'

import { InputComponent } from './form-components/input.component'
import { TextareaComponent } from './form-components/textarea.component'
import { NumberInputComponent } from './form-components/number-input.component'
import { DateComponent } from './form-components/date.component'
import { InputDateComponent } from './form-components/input-date.component'
import { TimeComponent } from './form-components/time.component'
import { InputStepperComponent } from './form-components/input-stepper.component'
import { SliderComponent } from './form-components/input-slider.component'
import { DropdownComponent } from './form-components/dropdown.component'
import { SelectComponent } from './form-components/select.component'
import { CheckboxComponent } from './form-components/checkbox.component'
import { CheckboxGroupComponent } from './form-components/checkbox-group.component'
import { CheckboxTilesComponent } from './form-components/checkbox-tiles.component'
import { RadioComponent } from './form-components/radio.component'
import { RadioButtonsComponent } from './form-components/radio-buttons.component'
import { SegmentComponent } from './form-components/segment.component'

import { ModalComponent } from './modal.component'
import { McpRendererComponent } from './mcp-renderer.component'
import { McpService, McpComponentNode, McpValidationResult } from './mcp.service'

export interface UpdateControl {
  name: string
  value: any
}

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...balImports,

    // Form Demo Components
    InputComponent,
    TextareaComponent,
    NumberInputComponent,
    DateComponent,
    InputDateComponent,
    TimeComponent,
    InputStepperComponent,
    SliderComponent,
    DropdownComponent,
    SelectComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxTilesComponent,
    RadioComponent,
    RadioButtonsComponent,
    SegmentComponent,

    // MCP Renderer
    McpRendererComponent,
  ],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">

        <!-- Tab Navigation -->
        <div class="mb-large">
          <bal-button
            [color]="activeTab === 'form' ? 'primary' : 'secondary'"
            (click)="activeTab = 'form'">
            Form Demo
          </bal-button>

          <bal-button
            [color]="activeTab === 'website' ? 'primary' : 'secondary'"
            (click)="activeTab = 'website'"
            class="ml-small">
            Website Beispiel
          </bal-button>
        </div>

        <!-- Form Demo -->
        <div *ngIf="activeTab === 'form'">
          <form
            class="is-flex fg-normal is-flex-direction-column"
            [formGroup]="myForm"
            (ngSubmit)="onSubmit()">

            <app-input [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-textarea [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-number-input [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-date [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-input-date [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-time [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-input-stepper [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-slider [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-dropdown [form]="myForm" (updateControl)="updateValue($event)"/>
            <app-select [form]="myForm" (updateControl)="updateValue($event)"/>

            <div class="pt-medium">
              <bal-button elementType="submit" [disabled]="!myForm.valid">
                Submit
              </bal-button>
            </div>

            <pre>{{ myForm.value | json }}</pre>
          </form>

          <bal-button (click)="openModal()">Open Modal</bal-button>
        </div>

        <!-- MCP Website -->
        <div *ngIf="activeTab === 'website'">
          <app-mcp-renderer [nodes]="mcpContent"></app-mcp-renderer>
        </div>

      </main>
    </bal-app>
  `,
})
export class AppComponent {

  activeTab: 'form' | 'website' = 'website'
  modalData!: any
  modal!: HTMLBalModalElement

  mcpContent: McpComponentNode[] = []

  myForm = new FormGroup({
    input: new FormControl('Init Value', Validators.required),
    textarea: new FormControl('Init Value', Validators.required),
    numberInput: new FormControl(null, Validators.required),
    date: new FormControl('2023-09-09', Validators.required),
  })

  constructor(
    private modalService: BalModalService,
    private mcp: McpService
  ) {
    this.initializeMcpContent()
  }

  /** Initialisiert den MCP-Tree (simulierter KI-Output) */
  private initializeMcpContent(): void {
    const generated = this.buildWebsiteMcpTree()
    const result: McpValidationResult = this.mcp.validate(generated)

    if (result.valid) {
      this.mcpContent = generated
    } else {
      console.error('MCP Validierung fehlgeschlagen:', result.errors)
    }
  }

  /** Beispiel-Webseite als strukturierter MCP-Tree */
  private buildWebsiteMcpTree(): McpComponentNode[] {
    return [
      {
        type: 'bal-page',
        children: [
          {
            type: 'bal-logo',
            props: { brand: 'helvetia' },
          },
          {
            type: 'bal-grid',
            children: [
              {
                type: 'bal-grid-column',
                props: { cols: 12, colsMd: 6 },
                children: [
                  {
                    type: 'bal-card',
                    children: [
                      {
                        type: 'bal-card-content',
                        children: [
                          {
                            type: 'bal-heading',
                            props: { level: 1, text: 'Lebensversicherungen, die Sie verstehen' },
                          },
                          {
                            type: 'bal-text',
                            props: {
                              text: 'Einfacher Schutz für Sie und Ihre Familie – digital und transparent.',
                            },
                          },
                          {
                            type: 'bal-button',
                            props: { color: 'primary', text: 'Beratung anfordern' },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  }

  updateValue(event: UpdateControl): void {
    this.myForm.get(event.name)?.setValue(event.value)
  }

  onSubmit(): void {
    console.warn(this.myForm.value)
  }

  async openModal(): Promise<void> {
    this.modal = await this.modalService.create({
      component: ModalComponent,
      componentProps: { firstName: 'Peter', lastName: 'Parker' },
    })
    await this.modal.present()
    this.modalData = (await this.modal.onWillDismiss()).data
  }
}
