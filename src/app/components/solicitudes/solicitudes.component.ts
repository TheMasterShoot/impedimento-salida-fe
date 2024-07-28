import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { compare } from 'fast-json-patch';
import { take } from 'rxjs';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
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

    if(this.solicitud){
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
        // this.sendEmail();
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
}
