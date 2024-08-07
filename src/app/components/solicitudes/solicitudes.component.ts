import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
import { EmailService } from 'src/app/services/email/email.service';
import { LevantamientoSalidaService } from 'src/app/services/levantamiento/levantamiento-salida.service';
import { RechazoService } from 'src/app/services/rechazo/rechazo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  formulario!: FormGroup;
  selectedFile: File | null = null;

  public ciudadano: any;
  public solicitud: any = {};
  public solicitudOriginal: any = {};
  public id: any = 1; //id del ciudadano
  public fechaHoy: Date = new Date();
  public fechaFormateada: any;
  public activo: boolean = false; 
  public rechazoExist: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService,
    private rechazoService: RechazoService,
    private ciudadanoService: CiudadanoService,
    private levatamientoSalidaService: LevantamientoSalidaService
  ){
    this.fechaFormateada = this.datePipe.transform(this.fechaHoy, 'yyyy-MM-dd');

    this.formulario = this.fb.group({
      email: ['', Validators.required],
      carta:  [null, Validators.required],
      sentencia:  [null, Validators.required],
      noRecurso:  [null, Validators.required]
    });
    
  }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      let id = params['id'];
      if(id){
        this.levatamientoSalidaService.getSolicitudLevantamientoById(id).subscribe(data => {
          if(data){
            this.solicitud = Object.assign({}, data);
            this.solicitudOriginal = data;
            this.activo = true;
  
            if (this.solicitud) {
              this.formulario.patchValue({
                email: this.solicitud.email
              })
            }
          }
        });
      }
    });
    
    this.ciudadanoService.getCiudadanoById(this.id).subscribe((data: any) => {
      if(data){
          this.ciudadano = data;
      }
    });
  }

  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
    }

    switch (field) {
      case 'carta':
        this.solicitud.carta = this.selectedFile;
        break;
      case 'sentencia':
        this.solicitud.sentencia = this.selectedFile;
        break;
      case 'noRecurso':
        this.solicitud.noRecurso = this.selectedFile;
        break;
    }
    
  }

  onSubmit(){
    this.solicitud.estatusid = 1;
    this.solicitud.cedula = this.ciudadano.cedula;
    this.solicitud.nombre = this.ciudadano.nombre;
    this.solicitud.apellido = this.ciudadano.apellido;

    if(this.solicitud.id){
      this.solicitud.fechaSolicitud = this.solicitud.fechaSolicitud;

      const formData = new FormData();
      Object.keys(this.formulario.controls).forEach(key => {
        const control = this.formulario.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });
      if (this.solicitud.carta) {
        formData.append('carta', this.solicitud.carta);
      }
      if (this.solicitud.sentencia) {
        formData.append('sentencia', this.solicitud.sentencia);
      }
      if (this.solicitud.noRecurso) {
        formData.append('noRecurso', this.solicitud.noRecurso);
      }
      formData.append('id', this.solicitud.id);
      formData.append('ciudadanoid', this.id);
      formData.append('cedula', this.solicitud.cedula);
      formData.append('estatusid',  this.solicitud.estatusid);
      formData.append('nombre', this.solicitud.nombre);
      formData.append('apellido', this.solicitud.apellido);
      formData.append('fechaSolicitud', this.solicitud.fechaSolicitud);

      this.levatamientoSalidaService.updateSolicitudLevantamiento(this.solicitud.id, formData).subscribe((data: any) => { 
        this.eliminarRechazo();
          Swal.fire({
            title: "Solicitud actualizada!",
            text: "Puede seguir el estatus de su solicitud en Consultar Servicios en Línea",
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/consulta-levantamiento-impedimento-salida']);
            }
          });
      });
    } else {
      
      this.solicitud.fechaSolicitud = this.fechaFormateada;

        if (this.formulario.valid) {
          const formData = new FormData();
          Object.keys(this.formulario.controls).forEach(key => {
            const control = this.formulario.get(key);
            if (control) {
              formData.append(key, control.value);
            }
          });
          if (this.solicitud.carta) {
            formData.append('carta', this.solicitud.carta);
          }
          if (this.solicitud.sentencia) {
            formData.append('sentencia', this.solicitud.sentencia);
          }
          if (this.solicitud.noRecurso) {
            formData.append('noRecurso', this.solicitud.noRecurso);
          }
          
            formData.append('ciudadanoid', this.id);
            formData.append('cedula', this.solicitud.cedula);
            formData.append('estatusid',  this.solicitud.estatusid);
            formData.append('nombre', this.solicitud.nombre);
            formData.append('apellido', this.solicitud.apellido);
            formData.append('fechaSolicitud', this.solicitud.fechaSolicitud);
  
        this.levatamientoSalidaService.createSolicitudLevantimiento(formData).subscribe((data: any) => {
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
  }

  eliminarRechazo(){
    this.rechazoService.getRechazos().subscribe((data: any) => {
      const levantamientoId = data.find( (r: any) => r.levantamientoid === this.solicitud.id);
      this.rechazoExist = levantamientoId;
    })
    if(this.rechazoExist) {
      this.rechazoService.deleteRechazo(this.rechazoExist.id).subscribe((data: any) => {
        console.log('Elemento eliminado:', data);
      });
    }
  }

  sendEmail(destino:string, nombre:string, apellido:string, fecSol:any, codigo:number){
    const email = {
      para: `${destino}`,
      asunto: 'Levantamiento de Impedimento de Salida Estatus de Solicitud',
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
            <p>Nos dirigimos a usted para informarle sobre el estatus de su solicitud presentada el ${this.datePipe.transform(fecSol, 'dd/MM/yyyy')} para Levantamiento de Impedimento de Salida.</p>
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
    const formData = new FormData();
    formData.append('Para', email.para);
    formData.append('Asunto', email.asunto);
    formData.append('Cuerpo', email.cuerpo);

    this.emailService.sendEmail(formData).subscribe();

  }
}
