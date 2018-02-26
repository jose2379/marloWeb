import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObrasComponent } from './add-obras.component';

describe('AddObrasComponent', () => {
  let component: AddObrasComponent;
  let fixture: ComponentFixture<AddObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
