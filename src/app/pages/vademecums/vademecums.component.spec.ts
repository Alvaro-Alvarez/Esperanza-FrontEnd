import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VademecumsComponent } from './vademecums.component';

describe('VademecumsComponent', () => {
  let component: VademecumsComponent;
  let fixture: ComponentFixture<VademecumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VademecumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VademecumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
