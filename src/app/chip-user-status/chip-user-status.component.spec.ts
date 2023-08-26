import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipUserStatusComponent } from './chip-user-status.component';

describe('ChipUserStatusComponent', () => {
  let component: ChipUserStatusComponent;
  let fixture: ComponentFixture<ChipUserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipUserStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
