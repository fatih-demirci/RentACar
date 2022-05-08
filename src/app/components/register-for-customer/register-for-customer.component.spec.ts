import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForCustomerComponent } from './register-for-customer.component';

describe('RegisterForCustomerComponent', () => {
  let component: RegisterForCustomerComponent;
  let fixture: ComponentFixture<RegisterForCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterForCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
