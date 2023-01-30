import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSemaphoreStockComponent } from './customer-semaphore-stock.component';

describe('CustomerSemaphoreStockComponent', () => {
  let component: CustomerSemaphoreStockComponent;
  let fixture: ComponentFixture<CustomerSemaphoreStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSemaphoreStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSemaphoreStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
