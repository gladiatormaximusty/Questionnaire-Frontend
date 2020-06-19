import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassWordComponent } from './new-pass-word.component';

describe('NewPassWordComponent', () => {
  let component: NewPassWordComponent;
  let fixture: ComponentFixture<NewPassWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPassWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
