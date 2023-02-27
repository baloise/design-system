---
'@baloise/design-system-components': minor
---

add `waitForComponent` util function for component testing. This waits until the web-component tree has fully rendered.

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { BrowserModule, By } from '@angular/platform-browser'
import { BalCoreModule, BalInputModule } from '@baloise/design-system-components-angular'
import { waitForComponent } from '@baloise/design-system-components'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserModule, BalCoreModule.forRoot(), BalInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  it(`should render input value`, async () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    await waitForComponent(fixture.nativeElement)
    const input = fixture.debugElement.query(By.css('[data-testid="input"]'))
    expect(input.nativeElement.value).toContain('My Value')
  })
})
```
