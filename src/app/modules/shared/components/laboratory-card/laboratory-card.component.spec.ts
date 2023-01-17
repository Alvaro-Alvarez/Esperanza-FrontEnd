import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryCardComponent } from './laboratory-card.component';

describe('LaboratoryCardComponent', () => {
  let component: LaboratoryCardComponent;
  let fixture: ComponentFixture<LaboratoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
