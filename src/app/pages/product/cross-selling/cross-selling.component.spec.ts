import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSellingComponent } from './cross-selling.component';

describe('CrossSellingComponent', () => {
  let component: CrossSellingComponent;
  let fixture: ComponentFixture<CrossSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
