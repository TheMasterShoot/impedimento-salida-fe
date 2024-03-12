// certificado.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent {
  selectedTab = 'obtenerCertificado';
  codigoCas: string = '';
  comentario: string = '';

  onFileChange(event: any) {
    // Implementar lógica para manejar el cambio de archivo si es necesario
  }

  submitForm() {
    // Implementar lógica para enviar el formulario
    console.log('Formulario enviado:', { codigoCas: this.codigoCas, comentario: this.comentario });
  }
}
