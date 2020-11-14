import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArdoiseComponent } from './ardoise.component';

describe('ArdoiseComponent', () => {
  let component: ArdoiseComponent;
  let fixture: ComponentFixture<ArdoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArdoiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArdoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
