import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaronaComponent } from './barona.component';

describe('BaronaComponent', () => {
  let component: BaronaComponent;
  let fixture: ComponentFixture<BaronaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaronaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
