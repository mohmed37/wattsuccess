import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvExpertComponent } from './cv-expert.component';

describe('CvExpertComponent', () => {
  let component: CvExpertComponent;
  let fixture: ComponentFixture<CvExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvExpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
