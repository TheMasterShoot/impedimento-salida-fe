import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { AuthService } from './services/auth.service';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'certificado-impedimento-salida', component: CertificadoComponent },
  { path: 'levantamiento-impedimento-salida', component: SolicitudesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
