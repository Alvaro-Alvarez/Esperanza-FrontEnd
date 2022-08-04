import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCustomComponent } from './number-custom.component';

describe('NumberCustomComponent', () => {
  let component: NumberCustomComponent;
  let fixture: ComponentFixture<NumberCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
