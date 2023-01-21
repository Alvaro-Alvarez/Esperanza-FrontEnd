import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDiscountsComponent } from './box-discounts.component';

describe('BoxDiscountsComponent', () => {
  let component: BoxDiscountsComponent;
  let fixture: ComponentFixture<BoxDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
