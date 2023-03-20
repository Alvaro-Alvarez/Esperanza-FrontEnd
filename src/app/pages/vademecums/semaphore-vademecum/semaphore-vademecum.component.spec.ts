import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemaphoreVademecumComponent } from './semaphore-vademecum.component';

describe('SemaphoreVademecumComponent', () => {
  let component: SemaphoreVademecumComponent;
  let fixture: ComponentFixture<SemaphoreVademecumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemaphoreVademecumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemaphoreVademecumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
