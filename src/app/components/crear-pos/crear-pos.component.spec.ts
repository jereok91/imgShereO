import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPosComponent } from './crear-pos.component';

describe('CrearPosComponent', () => {
  let component: CrearPosComponent;
  let fixture: ComponentFixture<CrearPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
