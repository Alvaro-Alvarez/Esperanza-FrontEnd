import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoModalComponent } from './show-video-modal.component';

describe('ShowVideoModalComponent', () => {
  let component: ShowVideoModalComponent;
  let fixture: ComponentFixture<ShowVideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVideoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
