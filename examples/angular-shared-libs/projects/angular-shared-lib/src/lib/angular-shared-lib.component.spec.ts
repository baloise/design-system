import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSharedLibComponent } from './angular-shared-lib.component';

describe('AngularSharedLibComponent', () => {
  let component: AngularSharedLibComponent;
  let fixture: ComponentFixture<AngularSharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularSharedLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
