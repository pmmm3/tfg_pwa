import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullAssignmentComponent } from './view-full-assignment.component';

describe('ViewFullAssignmentComponent', () => {
  let component: ViewFullAssignmentComponent;
  let fixture: ComponentFixture<ViewFullAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFullAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
