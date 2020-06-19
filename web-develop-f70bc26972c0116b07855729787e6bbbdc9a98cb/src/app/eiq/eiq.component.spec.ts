import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EIQComponent } from './eiq.component';

describe('EIQComponent', () => {
  let component: EIQComponent;
  let fixture: ComponentFixture<EIQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EIQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EIQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
