import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLaboratoryComponent } from './add-edit-laboratory.component';

describe('AddEditLaboratoryComponent', () => {
  let component: AddEditLaboratoryComponent;
  let fixture: ComponentFixture<AddEditLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLaboratoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
