/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentCompilerTypeReferences } from '@stencil/core/internal'
import { createComponentDefinition } from './generate-angular-component'

describe('createComponentDefinition', () => {
  const generateComponent = createComponentDefinition('component-library', '', '', 'standalone')

  test('should create a Angular component', () => {
    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as any)
    expect(finalText).toEqual(`

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  standalone: true
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`)
  })

  test('should create a Angular component with an event', () => {
    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [
        {
          internal: false,
          name: 'my-event',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: 'boolean',
            resolved: 'boolean',
            references: {},
          },
        },
      ],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as any)
    expect(finalText).toEqual(`

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  standalone: true,
  outputs: ['my-event']
})
export class MyComponent {
  /**  */
  my-event!: EventEmitter<BalEvents.MyComponentCustomEvent<boolean>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-event']);
  }
}`)
  })

  test('should create a Angular component with a event with a custom type', () => {
    const references: ComponentCompilerTypeReferences = {
      BalTabOption: {
        id: 'some-id',
        location: 'import',
        path: './bal-tab.type',
      },
    }

    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [
        {
          internal: false,
          name: 'my-event',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: 'BalTabOption',
            resolved: 'BalTabOption',
            references: references,
          },
        },
        {
          internal: false,
          name: 'my-event-two',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: 'BalTabOption',
            resolved: 'BalTabOption',
            references: references,
          },
        },
      ],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as any)

    expect(finalText).toEqual(`
import type { BalTabOption } from 'component-library/components';
export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  standalone: true,
  outputs: ['my-event', 'my-event-two']
})
export class MyComponent {
  /**  */
  my-event!: EventEmitter<BalEvents.MyComponentCustomEvent<BalTabOption>>;
  /**  */
  my-event-two!: EventEmitter<BalEvents.MyComponentCustomEvent<BalTabOption>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-event', 'my-event-two']);
  }
}`)
  })

  test('should create a Angular component with a event with a custom type', () => {
    const references: ComponentCompilerTypeReferences = {
      MouseEvent: {
        id: 'some-id',
        location: 'global',
      },
    }

    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [
        {
          internal: false,
          name: 'my-event',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: 'MouseEvent',
            resolved: 'MouseEvent',
            references: references,
          },
        },
      ],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as any)

    expect(finalText).toEqual(`

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  defineCustomElementFn: defineMyComponent
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  standalone: true,
  outputs: ['my-event']
})
export class MyComponent {
  /**  */
  my-event!: EventEmitter<BalEvents.MyComponentCustomEvent<MouseEvent>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-event']);
  }
}`)
  })
})
