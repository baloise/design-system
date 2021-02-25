import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormComponent } from './form.component'
import { BalUiLibraryModule } from '@baloise/ui-library-angular'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'

describe('FormComponent', () => {
  let component: FormComponent
  let fixture: ComponentFixture<FormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [BalUiLibraryModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(FormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenRenderingDone()
    await fixture.whenStable()
    fixture.nativeElement.className = 'bal-app'
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should placeholder', () => {
    const compiled = fixture.nativeElement
    const balInput: HTMLBalInputElement = compiled.querySelector('bal-input')

    expect(balInput.placeholder).toContain('Enter your name')
  })

  it('should input', () => {
    const compiled = fixture.nativeElement
    const balInput: HTMLBalInputElement = compiled.querySelector('bal-input')
    const paragraph: HTMLParagraphElement = compiled.querySelector('p#firstname-value')

    balInput.value = 'Bubu'
    balInput.dispatchEvent(new CustomEvent('balInput', { detail: 'Bubu' }))
    balInput.dispatchEvent(new CustomEvent('balChange', { detail: 'Bubu' }))
    fixture.detectChanges()

    expect(balInput.value).toContain('Bubu')
    expect(paragraph.textContent).toContain('Bubu')
  })

  it('should select', async () => {
    const compiled = fixture.nativeElement
    const balSelect: HTMLBalSelectElement = compiled.querySelector('bal-select')
    const paragraph: HTMLParagraphElement = compiled.querySelector('p#age-value')

    await balSelect.open()
    const balSelectOption: HTMLBalSelectElement = compiled.querySelector('bal-select-option[label="1997"]')
    balSelectOption.click()

    await fixture.whenStable()
    balSelect.dispatchEvent(new Event('balChange'))
    fixture.detectChanges()

    expect(balSelect.value).toContain('1997')
    expect(paragraph.textContent).toContain('1997')
  })

  // fit('should button', fakeAsync(() => {
  //   fixture.detectChanges()
  //   spyOn(component, 'onSubmit')

  //   const compiled = fixture.nativeElement
  //   const balButton = compiled.querySelector('bal-button#submit')

  //   balButton.click()
  //   tick(2501)
  //   fixture.detectChanges()

  //   fixture.whenStable().then(() => {
  //     // expect(balButton.disabled).toBeTrue()
  //     expect(component.onSubmit).toHaveBeenCalled()
  //   })
  // }))
})
