import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
import { LevantamientoSalidaService } from 'src/app/services/levantamiento/levantamiento-salida.service';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  public formulario: FormGroup;
  public ciudadano: any;
  public solicitud: any = {};
  public id: any = 1; //id del ciudadano
  public fechaHoy: Date = new Date();
  public fechaFormateada: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private ciudadanoService: CiudadanoService,
    private levatamientoSalidaService: LevantamientoSalidaService
  ){
    this.fechaFormateada = this.datePipe.transform(this.fechaHoy, 'yyyy-MM-dd');
    this.formulario = this.fb.group({
      estatusid: [0],
      ciudadanoid: [0],
      nombre: [''],
      apellido: [''],
      cedula: [''],
      fechaSolicitud: [''],
      carta: [null],
      sentencia: [null],
      noRecurso: [null]
    });
  }

  ngOnInit(): void {
    this.ciudadanoService.getCiudadanoById(this.id).subscribe((data: any) => {
      if(data){
          this.ciudadano = data;
      }

      this.solicitud.ciudadanoid = this.ciudadano.id
  });

  }

  onFileSelected(event: any, field: string) {
    const file = event.target.files[0];
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(file)));

    switch (field) {
      case 'carta':
        this.solicitud.carta = file;
        break;
      case 'sentencia':
        this.solicitud.sentencia = file;
        break;
      case 'noRecurso':
        this.solicitud.noRecurso = file;
        break;
    }
  }

  enviar(){
     this.solicitud.estatusid = 1;
    this.solicitud.cedula = this.ciudadano.cedula;
    this.solicitud.nombre = this.ciudadano.nombre;
    this.solicitud.apellido = this.ciudadano.apellido;
    this.solicitud.fechaSolicitud = this.fechaFormateada;
    if (this.formulario.valid) {
      const formData = new FormData();
        formData.append('carta', this.solicitud.carta);
        formData.append('sentencia', this.solicitud.sentencia);
        formData.append('noRecurso', this.solicitud.noRecurso);
        formData.append('cidudadanoid', this.solicitud.ciudadanoid);
        formData.append('estatusid',  this.solicitud.estatusid);
        formData.append('ciudadano', this.solicitud.cedula);
        formData.append('nombre', this.solicitud.nombre);
        formData.append('apellido', this.solicitud.apellido);
        formData.append('fechaSolicitud', this.solicitud.fechaSolicitud);
        console.log('FormData: ', formData)
      
    // this.solicitud.estatusid = 1;
    // this.solicitud.cedula = this.ciudadano.cedula;
    // this.solicitud.nombre = this.ciudadano.nombre;
    // this.solicitud.apellido = this.ciudadano.apellido;
    // this.solicitud.fechaSolicitud = this.fechaFormateada;
    this.levatamientoSalidaService.createSolicitudLevantimiento(formData).subscribe((data: any) => 
      console.log(data));

  }
  }
}
