import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url:string = "https://impsa.azurewebsites.net/api/"
  // url:string = "https://localhost:8080/api/"

  constructor(private http:HttpClient) { }

  sendEmail(email: FormData): Observable<any> {
    let direccion = this.url + 'Email';
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post<any>(direccion, email, { headers });
  }

}
