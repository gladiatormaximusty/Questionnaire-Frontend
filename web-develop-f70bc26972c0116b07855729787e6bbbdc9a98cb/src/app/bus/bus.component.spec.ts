import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BUsComponent } from './bus.component';

describe('BUsComponent', () => {
  let component: BUsComponent;
  let fixture: ComponentFixture<BUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
