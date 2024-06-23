import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ExistenciaComponent } from './components/existencia/existencia.component';
import { LevantamientoComponent } from './components/levantamiento/levantamiento.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'administracion/inicio' },
  { path: 'inicio', component: InicioComponent },
  { path: 'levantamiento', component: LevantamientoComponent },
  { path: 'existencia', component: ExistenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRouter { }
