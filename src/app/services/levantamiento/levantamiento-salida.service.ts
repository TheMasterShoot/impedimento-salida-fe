import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevantamientoSalidaService {

  url:string = "https://localhost:8080/api/"

  constructor(private http:HttpClient) { }

  createSolicitudLevantimiento(solicitud: FormData): Observable<any> {
    let direccion = this.url + 'SolicitudLevantamiento';
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post<any>(direccion, solicitud, { headers });
  }

}
