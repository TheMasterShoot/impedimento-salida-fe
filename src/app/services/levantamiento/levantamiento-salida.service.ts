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

  getSolicitudesLevantamiento(): Observable<any[]> {
    let direccion = this.url + 'SolicitudLevantamiento';
    return this.http.get<any[]>(direccion);
  }
  
  getSolicitudLevantamientoById(id: any): Observable<any> {
    let direccion = this.url + 'SolicitudLevantamiento/' + id;
    return this.http.get<any>(direccion);
  }

  updateSolicitudLevantamiento(levantamiento: any): Observable<any> {
    let direccion = this.url + 'SolicitudLevantamiento/' + levantamiento.id;
    // const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.put<any>(direccion, levantamiento);
  }

  // patchSolicitudLevantamiento(id: number, operations: Operation[]){
  //   let direccion = this.url + 'SolicitudLevantamiento/' + id;
  //   return this.http.patch(direccion, operations);
  // }

}
