import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificacionExistenciaService } from 'src/app/services/certificado/certificado-existencia.service';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
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