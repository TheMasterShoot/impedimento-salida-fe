import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultaExistenciaComponent } from './components/consulta-existencia/consulta-existencia.component';
import { ConsultaLevantamientoComponent } from './components/consulta-levantamiento/consulta-levantamiento.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'certificado-impedimento-salida', component: CertificadoComponent },
  { path: 'levantamiento-impedimento-salida', component: SolicitudesComponent },
  { path: 'levantamiento-impedimento-salida/:id', component: SolicitudesComponent },
  { path: 'consulta-existencia-impedimento-salida', component: ConsultaExistenciaComponent },
  { path: 'consulta-levantamiento-impedimento-salida', component: ConsultaLevantamientoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
