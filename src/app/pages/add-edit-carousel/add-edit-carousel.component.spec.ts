import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarouselComponent } from './add-edit-carousel.component';

describe('AddEditCarouselComponent', () => {
  let component: AddEditCarouselComponent;
  let fixture: ComponentFixture<AddEditCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
