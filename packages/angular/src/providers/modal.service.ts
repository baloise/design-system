import { Injectable, Type } from '@angular/core'
import { ComponentRef, ModalOptions, dsModalController } from '@helvetia-design/core'
import { AngularDelegate } from './angular-delegate'
import { DsModalRef } from './modal-ref'

@Injectable({
  providedIn: 'root',
})
export class DsModalService {
  constructor(private readonly angularDelegate: AngularDelegate) {}

  async create<T>(
    component: Type<T>,
    componentProps?: { [key: string]: unknown },
    options?: Pick<ModalOptions, 'closable' | 'modalWidth' | 'fullscreen' | 'label'>,
  ): Promise<DsModalRef> {
    const element = await dsModalController.create({
      ...options,
      component: component as ComponentRef,
      componentProps,
      delegate: this.angularDelegate,
    })

    return DsModalRef.for(element)
  }
}
