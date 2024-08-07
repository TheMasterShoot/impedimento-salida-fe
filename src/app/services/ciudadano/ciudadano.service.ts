import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {

  url:string = "https://impsa.azurewebsites.net/api/"
  // url:string = "https://localhost:8080/api/"

  constructor(private http:HttpClient) { }

  getCiudadanoById(id: any): Observable<any> {
    let direccion = this.url + 'Ciudadanos/' + id;
    return this.http.get<any[]>(direccion);
  }

}
