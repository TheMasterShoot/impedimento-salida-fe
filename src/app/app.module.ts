import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { FormsModule } from '@angular/forms';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { AdministracionModule } from './modules/administracion/administracion.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CertificadoComponent,
    SolicitudesComponent,
    HomeComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdministracionModule,
    HttpClientModule,
  ],
  providers: [ DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
