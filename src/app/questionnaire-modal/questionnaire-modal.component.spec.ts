import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireModalComponent } from './questionnaire-modal.component';

describe('QuestionnaireModalComponent', () => {
  let component: QuestionnaireModalComponent;
  let fixture: ComponentFixture<QuestionnaireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
