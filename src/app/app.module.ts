import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConsultaExistenciaComponent } from './components/consulta-existencia/consulta-existencia.component';
import { ConsultaLevantamientoComponent } from './components/consulta-levantamiento/consulta-levantamiento.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    CertificadoComponent,
    SolicitudesComponent,
    ConsultaExistenciaComponent,
    ConsultaLevantamientoComponent,
    HomeComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [ DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
