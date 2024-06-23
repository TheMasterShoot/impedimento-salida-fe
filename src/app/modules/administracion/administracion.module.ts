import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { LevantamientoComponent } from './components/levantamiento/levantamiento.component';
import { ExistenciaComponent } from './components/existencia/existencia.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdministracionRouter } from './administracion.router';
import { AdministracionTemplateComponent } from './administracion.template.component';



@NgModule({
  declarations: [
    AdministracionTemplateComponent,
    InicioComponent,
    LoginComponent,
    LevantamientoComponent,
    ExistenciaComponent,
    MenuComponent
  ],
  imports: [
    AdministracionRouter,
    CommonModule
  ]
})
export class AdministracionModule { }
