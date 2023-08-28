import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRequestUsersComponent } from './table-request-users.component';

describe('TableRequestUsersComponent', () => {
  let component: TableRequestUsersComponent;
  let fixture: ComponentFixture<TableRequestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRequestUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRequestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
