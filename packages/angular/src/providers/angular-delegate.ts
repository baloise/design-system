import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  NgZone,
  Type,
  createComponent,
} from '@angular/core'
import { FrameworkDelegate } from '@helvetia-design/core'
import { DsModalRef } from './modal-ref'
import { DS_MODAL_DATA } from './modal.tokens'

/**
 * `packages/core`'s `attachComponent()` only ever calls this from an imperative service call
 * (e.g. `DsModalService.create()`), which has no ambient `ViewContainerRef` to create the
 * component against. Angular CDK's `DomPortalOutlet` (which `MatDialog` uses) falls back to
 * exactly this path — the free `createComponent()` function plus `ApplicationRef.attachView()`
 * — whenever no `ViewContainerRef` is supplied, and the deprecated `BalModalService` never
 * actually supplied one either despite its delegate accepting one. So this delegate always
 * uses that path rather than requiring a real `ViewContainerRef`.
 */
@Injectable()
export class AngularDelegate implements FrameworkDelegate {
  private readonly componentRefs = new WeakMap<HTMLElement, ComponentRef<unknown>>()

  constructor(
    private readonly envInjector: EnvironmentInjector,
    private readonly appRef: ApplicationRef,
    private readonly zone: NgZone,
  ) {}

  attachViewToDom(
    container: HTMLDsModalElement,
    component: Type<unknown>,
    componentProps?: { [key: string]: unknown },
    cssClasses?: string[],
  ): Promise<HTMLElement> {
    return Promise.resolve(
      this.zone.run(() => {
        const modalRef = new DsModalRef(container)
        const elementInjector = Injector.create({
          providers: [
            { provide: DS_MODAL_DATA, useValue: componentProps },
            { provide: DsModalRef, useValue: modalRef },
          ],
          parent: this.envInjector,
        })

        const componentRef = createComponent(component, {
          environmentInjector: this.envInjector,
          elementInjector,
        })

        const hostElement = componentRef.location.nativeElement as HTMLElement
        cssClasses?.forEach(cssClass => hostElement.classList.add(cssClass))
        hostElement.slot = 'body'
        container.appendChild(hostElement)
        this.appRef.attachView(componentRef.hostView)
        this.componentRefs.set(hostElement, componentRef)

        return hostElement
      }),
    )
  }

  removeViewFromDom(_container: unknown, element: HTMLElement): Promise<void> {
    return Promise.resolve(
      this.zone.run(() => {
        const componentRef = this.componentRefs.get(element)
        if (componentRef) {
          this.appRef.detachView(componentRef.hostView)
          componentRef.destroy()
          this.componentRefs.delete(element)
        }
      }),
    )
  }
}
