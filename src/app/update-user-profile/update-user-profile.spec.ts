import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserProfile } from './update-user-profile';

describe('UpdateUserProfile', () => {
  let component: UpdateUserProfile;
  let fixture: ComponentFixture<UpdateUserProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
