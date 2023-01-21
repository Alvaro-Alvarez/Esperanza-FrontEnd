import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemaphoreStockComponent } from './semaphore-stock.component';

describe('SemaphoreStockComponent', () => {
  let component: SemaphoreStockComponent;
  let fixture: ComponentFixture<SemaphoreStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemaphoreStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemaphoreStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
