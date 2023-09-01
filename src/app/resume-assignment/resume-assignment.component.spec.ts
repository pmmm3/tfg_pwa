import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAssignmentComponent } from './resume-assignment.component';

describe('ResumeAssignmentComponent', () => {
  let component: ResumeAssignmentComponent;
  let fixture: ComponentFixture<ResumeAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
