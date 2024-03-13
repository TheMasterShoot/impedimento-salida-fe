import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ObtenerCertificadoComponent } from './components/obtener-certificado/obtener-certificado.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';


@NgModule({
  declarations: [
    AppComponent,
    CertificadoComponent,
    LoginComponent,
    ObtenerCertificadoComponent,
    RequisitosComponent,
    SolicitudesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
