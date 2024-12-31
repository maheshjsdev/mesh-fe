import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { 

  }

  userLogin = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/login`, formData)
  }
  verifyingEmail = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/verifyemail`, formData)
  }
}
