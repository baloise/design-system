import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsFileUpload } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value?.length ? null : { required: message })
}

const createFile = (name: string) => new File([`content of ${name}`], name, { type: 'text/plain' })

@Component({
  selector: 'app-file-upload-demo',
  imports: [DsFileUpload, ReactiveFormsModule],
  templateUrl: './file-upload-demo.html',
})
export class FileUploadDemo {
  protected readonly fileUploadValue = signal<File[]>([])

  protected readonly reactiveForm = new FormGroup({
    files: new FormControl<File[]>([createFile('a.txt')], {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    files: new FormControl<File[]>([createFile('a.txt')], {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onFileUploadChange(event: CustomEvent<File[]>) {
    this.fileUploadValue.set(event.detail)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.files
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.files.setValue([createFile('b.txt'), createFile('c.txt')])
  }

  protected clearReactiveFormValue() {
    this.reactiveForm.controls.files.setValue([])
  }

  protected clearAutoInvalidOffFormValue() {
    this.autoInvalidOffForm.controls.files.setValue([])
  }
}
