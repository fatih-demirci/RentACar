import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUpdateDetailsComponent } from './car-update-details.component';

describe('CarUpdateDetailsComponent', () => {
  let component: CarUpdateDetailsComponent;
  let fixture: ComponentFixture<CarUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
