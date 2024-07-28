import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { CertificacionExistenciaService } from 'src/app/services/certificado/certificado-existencia.service';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';

@Component({
  selector: 'app-consulta-existencia',
  templateUrl: './consulta-existencia.component.html',
  styleUrls: ['./consulta-existencia.component.css']
})
export class ConsultaExistenciaComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};
  public id: any = 1; //id del ciudadano
  public ciudadano: any;
  public certificaciones: any[] = [];

  constructor(
    private ciudadanoService: CiudadanoService,
    private certificacionService: CertificacionExistenciaService
) {
  this.ciudadanoService.getCiudadanoById(this.id).subscribe((data: any) => {
    if(data){
        this.ciudadano = data;
    }
});

  this.certificacionService.getCertificaciones().subscribe((data: any[]) => {
    const filtered = data.filter(data =>  data.ciudadanoid === this.id);
    this.certificaciones = filtered;
});
}
  
  ngOnInit(): void {
    this.dataTableOption();
  }
  
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

  dataTableOption(){
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        searching: false,
        processing: true,
        order: [[2, 'desc']],
        language: {
          url: '//cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json',
      },
    };
  }
}
