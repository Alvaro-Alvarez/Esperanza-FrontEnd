import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPlacedComponent } from './orders-placed.component';

describe('OrdersPlacedComponent', () => {
  let component: OrdersPlacedComponent;
  let fixture: ComponentFixture<OrdersPlacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersPlacedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
