import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationPersonalComponent } from './profile-information-personal.component';

describe('ProfileInformationPersonalComponent', () => {
  let component: ProfileInformationPersonalComponent;
  let fixture: ComponentFixture<ProfileInformationPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInformationPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInformationPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
