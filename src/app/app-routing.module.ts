import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { AuthService } from './services/auth.service';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'certificate', component: CertificadoComponent, canActivate: [AuthService] },
  { path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthService], data: { roles: ['administrative'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
