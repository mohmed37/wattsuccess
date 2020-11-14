import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifClientComponent } from './modif-client.component';

describe('ModifClientComponent', () => {
  let component: ModifClientComponent;
  let fixture: ComponentFixture<ModifClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
