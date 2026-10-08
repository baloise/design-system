import { Injectable, Type } from '@angular/core'
import { ComponentRef, dsModalController } from '@helvetia-design/core'
import { AngularDelegate } from './angular-delegate'
import { DsModalRef } from './modal-ref'

@Injectable({
  providedIn: 'root',
})
export class DsModalService {
  constructor(private readonly angularDelegate: AngularDelegate) {}

  async create<T>(component: Type<T>, componentProps?: { [key: string]: unknown }): Promise<DsModalRef> {
    const element = await dsModalController.create({
      component: component as ComponentRef,
      componentProps,
      delegate: this.angularDelegate,
    })

    return new DsModalRef(element)
  }
}
