import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLaboratoryComponent } from './product-laboratory.component';

describe('ProductLaboratoryComponent', () => {
  let component: ProductLaboratoryComponent;
  let fixture: ComponentFixture<ProductLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLaboratoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
