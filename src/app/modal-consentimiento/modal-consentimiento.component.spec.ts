import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsentimientoComponent } from './modal-consentimiento.component';

describe('ModalConsentimientoComponent', () => {
  let component: ModalConsentimientoComponent;
  let fixture: ComponentFixture<ModalConsentimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConsentimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConsentimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
