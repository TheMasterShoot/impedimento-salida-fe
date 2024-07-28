import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { CiudadanoService } from 'src/app/services/ciudadano/ciudadano.service';
import { LevantamientoSalidaService } from 'src/app/services/levantamiento/levantamiento-salida.service';

@Component({
  selector: 'app-consulta-levantamiento',
  templateUrl: './consulta-levantamiento.component.html',
  styleUrls: ['./consulta-levantamiento.component.css']
})
export class ConsultaLevantamientoComponent {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};
  public id: any = 1; //id del ciudadano
  public ciudadano: any;
  public levantamientos: any[] = [];

  constructor(
    private ciudadanoService: CiudadanoService,
    private levantamientoService: LevantamientoSalidaService
) {
  this.ciudadanoService.getCiudadanoById(this.id).subscribe((data: any) => {
    if(data){
        this.ciudadano = data;
    }
});

  this.levantamientoService.getSolicitudesLevantamiento().subscribe((data: any[]) => {
    const filtered = data.filter(data =>  data.ciudadanoid === this.id);
    this.levantamientos = filtered;
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
        order: [[0, 'desc']],
        language: {
          url: '//cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json',
      },
    };
  }

}
