import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSemaphoreStockMoresellersComponent } from './customer-semaphore-stock-moresellers.component';

describe('CustomerSemaphoreStockMoresellersComponent', () => {
  let component: CustomerSemaphoreStockMoresellersComponent;
  let fixture: ComponentFixture<CustomerSemaphoreStockMoresellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSemaphoreStockMoresellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSemaphoreStockMoresellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
