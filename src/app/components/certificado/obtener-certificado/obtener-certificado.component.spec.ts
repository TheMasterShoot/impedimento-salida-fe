import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerCertificadoComponent } from './obtener-certificado.component';

describe('ObtenerCertificadoComponent', () => {
  let component: ObtenerCertificadoComponent;
  let fixture: ComponentFixture<ObtenerCertificadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObtenerCertificadoComponent]
    });
    fixture = TestBed.createComponent(ObtenerCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
