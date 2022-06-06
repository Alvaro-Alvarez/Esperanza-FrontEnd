import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAndTotalComponent } from './description-and-total.component';

describe('DescriptionAndTotalComponent', () => {
  let component: DescriptionAndTotalComponent;
  let fixture: ComponentFixture<DescriptionAndTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionAndTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionAndTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
