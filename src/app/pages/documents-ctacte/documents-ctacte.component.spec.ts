import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCtacteComponent } from './documents-ctacte.component';

describe('DocumentsCtacteComponent', () => {
  let component: DocumentsCtacteComponent;
  let fixture: ComponentFixture<DocumentsCtacteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsCtacteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsCtacteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
