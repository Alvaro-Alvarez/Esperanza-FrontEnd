import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringOffersComponent } from './expiring-offers.component';

describe('ExpiringOffersComponent', () => {
  let component: ExpiringOffersComponent;
  let fixture: ComponentFixture<ExpiringOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiringOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiringOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
