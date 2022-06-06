import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpSellingComponent } from './up-selling.component';

describe('UpSellingComponent', () => {
  let component: UpSellingComponent;
  let fixture: ComponentFixture<UpSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
