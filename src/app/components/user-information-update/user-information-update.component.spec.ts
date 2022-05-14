import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationUpdateComponent } from './user-information-update.component';

describe('UserInformationUpdateComponent', () => {
  let component: UserInformationUpdateComponent;
  let fixture: ComponentFixture<UserInformationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInformationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
