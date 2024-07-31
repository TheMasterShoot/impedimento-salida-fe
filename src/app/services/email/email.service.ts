import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url:string = "https://impedimentosalidaapi.azurewebsites.net/api/"

  constructor(private http:HttpClient) { }

  sendEmail(email: any): Observable<any> {
    let direccion = this.url + 'Email';
    return this.http.post<any>(direccion, email);
  }

}
