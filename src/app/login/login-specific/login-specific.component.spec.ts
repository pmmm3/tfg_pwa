import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSpecificComponent } from './login-specific.component';

describe('LoginSpecificComponent', () => {
  let component: LoginSpecificComponent;
  let fixture: ComponentFixture<LoginSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSpecificComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
