import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificacionExistenciaService } from 'src/app/services/certificado/certificado-existencia.service';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
import { EmailService } from 'src/app/services/email/email.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {
  formulario!: FormGroup;
  public ciudadano: any;
  public solicitud: any = {};
  public id: any = 1; //id del ciudadano
  public fechaHoy: Date = new Date();
  public fechaFormateada: any;
  
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private emailService: EmailService,
    private ciudadanoService: CiudadanoService,
    private certificacionService: CertificacionExistenciaService
  ) { 
    this.fechaFormateada = this.datePipe.transform(this.fechaHoy, 'yyyy-MM-dd');
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required]),
      cas: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.ciudadanoService.getCiudadanoById(this.id).subscribe((data: any) => {
      if(data){
          this.ciudadano = data;
      }
    });
  }

  onSubmit(){
    this.solicitud.estatusid = 1;
    this.solicitud.cedula = this.ciudadano.cedula;
    this.solicitud.nombre = this.ciudadano.nombre;
    this.solicitud.apellido = this.ciudadano.apellido;
    this.solicitud.fechaSolicitud = this.fechaFormateada;

      if (this.formulario.valid) {
        const certificacion: any = {
          cas: this.formulario.value.cas,
          email: this.formulario.value.email,
          ciudadanoid: this.id,          
          cedula: this.solicitud.cedula,
          estatusid:  this.solicitud.estatusid,
          nombre: this.solicitud.nombre,
          apellido: this.solicitud.apellido,
          fechaSolicitud: this.solicitud.fechaSolicitud
        }

      this.certificacionService.addCertificacion(certificacion).subscribe((data: any) => {
        this.sendEmail(data.email, data.nombre, data.apellido, data.fechaSolicitud, data.id);
        Swal.fire({
          title: "Solicitud enviada!",
          text: "Puede seguir el estatus de su solicitud en Consultar Servicios en Línea",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      });
    }
  }

  sendEmail(destino:string, nombre:string, apellido:string, fecSol:any, codigo:number){
    const email = {
      para: `${destino}`,
      asunto: 'Certificación de existencia de Impedimento de Salida Estatus de Solicitud',
      cuerpo:`
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        .encabezado {
            font-size: 10px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header, .footer {
            text-align: left;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            margin-bottom: 20px;
        }
        .details {
            margin-top: 20px;
        }
    </style>
</head>
<body>
        <div class="header">
            <h1>Procuraduría General de la República</h1>
            <p class="encabezado">Ave. Jiménez Moya esq. Juan Ventura Simó, Centro de los Héroes, Santo Domingo, República Dominicana.</p>
            <p class="encabezado">Tel.: 809-533-3522 ext. 133, 2002, 1125</p>
            <p class="encabezado">Email: mesadeayuda@pgr.gob.do</p>
        </div>
        <hr>
        <br>
        <div class="content">
            <p><strong>Estimado/a ${nombre + ' ' + apellido}:</strong></p>
            <p>Nos dirigimos a usted para informarle sobre el estatus de su solicitud presentada el ${this.datePipe.transform(fecSol, 'dd/MM/yyyy')} para Certificación de Existencia de Impedimento de Salida.</p>
            <div class="details">
                <p>Estatus de su Solicitud: <strong>Pendiente</strong></p>
                <p><strong>Detalles:</strong></p>
                <ul>
                    <li>Número de Solicitud:<strong>${codigo}</strong></li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <p>Para más información, no dude en contactarnos a través de los medios mencionados arriba.</p>
        </div>
</body>
      
      `
    }
    
    this.emailService.sendEmail(email).subscribe();

  }

}