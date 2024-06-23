import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevantamientoSalidaService {

  url:string = "https://localhost:8080/api/"

  constructor(private http:HttpClient) { }

  createSolicitudLevantimiento(solicitud: any): Observable<any> {
    let direccion = this.url + 'SolicitudLevantamiento';
    return this.http.post<any>(direccion, solicitud);
  }

}
