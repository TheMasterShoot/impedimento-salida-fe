import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevantamientoComponent } from './levantamiento.component';

describe('LevantamientoComponent', () => {
  let component: LevantamientoComponent;
  let fixture: ComponentFixture<LevantamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevantamientoComponent]
    });
    fixture = TestBed.createComponent(LevantamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
