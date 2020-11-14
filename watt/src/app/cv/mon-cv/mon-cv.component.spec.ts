import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCvComponent } from './mon-cv.component';

describe('MonCvComponent', () => {
  let component: MonCvComponent;
  let fixture: ComponentFixture<MonCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
