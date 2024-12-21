import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http:HttpClient) { }

  getAllUser = () => {
    return this._http.get<any>(`${environment.API_URL}/user-management/getuser`)
  }
  editUser = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/edituser`, formData)
  }
  addUser = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/adduser`, formData)
  }
  deleteUser = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/deleteuser`, formData)
  }
  chnageUserStatus = (formData:any) => {
    return this._http.post<any>(`${environment.API_URL}/user-management/changeuserstatus`, formData)
  }
}
