import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssaysAndServicesComponent } from './essays-and-services.component';

describe('EssaysAndServicesComponent', () => {
  let component: EssaysAndServicesComponent;
  let fixture: ComponentFixture<EssaysAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssaysAndServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssaysAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
