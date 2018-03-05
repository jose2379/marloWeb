import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleObraComponent } from './detalle-obra.component';

describe('DetalleObraComponent', () => {
  let component: DetalleObraComponent;
  let fixture: ComponentFixture<DetalleObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
