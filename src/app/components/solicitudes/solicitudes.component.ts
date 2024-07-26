import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
import { LevantamientoSalidaService } from 'src/app/services/levantamiento/levantamiento-salida.service';
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
  public id: any = 1; //id del ciudadano
  public fechaHoy: Date = new Date();
  public fechaFormateada: any;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private ciudadanoService: CiudadanoService,
    private levatamientoSalidaService: LevantamientoSalidaService
  ){
    this.fechaFormateada = this.datePipe.transform(this.fechaHoy, 'yyyy-MM-dd');
    
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required]),
      carta: new FormControl('', [Validators.required]),
      sentencia: new FormControl('', [Validators.required]),
      noRecurso: new FormControl('', [Validators.required])
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
        // this.sendEmail();
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
