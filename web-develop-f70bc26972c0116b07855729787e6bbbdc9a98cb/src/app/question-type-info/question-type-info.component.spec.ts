import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeInfoComponent } from './question-type-info.component';

describe('QuestionTypeInfoComponent', () => {
  let component: QuestionTypeInfoComponent;
  let fixture: ComponentFixture<QuestionTypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
