import { ComponentFactoryResolver, Injector } from '@angular/core';
import type { BalModalController, ModalOptions } from '@baloise/design-system-components/components';
import { AngularDelegate, OverlayBaseController } from '@baloise/design-system-components-angular/common';
import * as i0 from "@angular/core";
export declare class BalModalService extends OverlayBaseController<ModalOptions, HTMLBalModalElement> {
    private angularDelegate;
    private resolver;
    private injector;
    constructor(angularDelegate: AngularDelegate, resolver: ComponentFactoryResolver, injector: Injector, ctrl: BalModalController);
    create(opts: ModalOptions): Promise<HTMLBalModalElement>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BalModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BalModalService>;
}
