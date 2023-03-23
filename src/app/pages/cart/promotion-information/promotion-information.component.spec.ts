import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInformationComponent } from './promotion-information.component';

describe('PromotionInformationComponent', () => {
  let component: PromotionInformationComponent;
  let fixture: ComponentFixture<PromotionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
