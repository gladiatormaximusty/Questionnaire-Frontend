import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingDocumentComponent } from './supporting-document.component';

describe('SupportingDocumentComponent', () => {
  let component: SupportingDocumentComponent;
  let fixture: ComponentFixture<SupportingDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportingDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
