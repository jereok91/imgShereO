import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccontComponent } from './create-accont.component';

describe('CreateAccontComponent', () => {
  let component: CreateAccontComponent;
  let fixture: ComponentFixture<CreateAccontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
