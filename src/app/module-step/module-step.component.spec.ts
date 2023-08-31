import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleStepComponent } from './module-step.component';

describe('ModuleStepComponent', () => {
  let component: ModuleStepComponent;
  let fixture: ComponentFixture<ModuleStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
