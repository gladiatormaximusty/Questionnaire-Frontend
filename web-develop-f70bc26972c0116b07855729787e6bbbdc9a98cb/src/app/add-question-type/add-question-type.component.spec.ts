import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionTypeComponent } from './add-question-type.component';

describe('AddQuestionTypeComponent', () => {
  let component: AddQuestionTypeComponent;
  let fixture: ComponentFixture<AddQuestionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
