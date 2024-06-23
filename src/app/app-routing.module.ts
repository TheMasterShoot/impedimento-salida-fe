import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'certificado-impedimento-salida', component: CertificadoComponent },
  { path: 'levantamiento-impedimento-salida', component: SolicitudesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
  { path: 'administracion', loadChildren: () => import('./modules/administracion/administracion.module').then(m => m.AdministracionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
