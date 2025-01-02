import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { currentUserState } from './userState';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  currentUser = new currentUserState();
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUser.setCurrentUser = user;

    const authMsgValue = localStorage.getItem('authMsg');
    this.currentUser.authGaurdMsg = authMsgValue;
  }

  set setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.setCurrentUser = user;
  }
  set AuthGaurdMsg(msg: any) {
    localStorage.setItem('authMsg', JSON.stringify(msg));
    this.currentUser.authGaurdMsg = msg;
  }
  clearLocalStorage = (): void => {
    localStorage.clear();
  };
  get getToken() {
    return localStorage.getItem('token');
  }

  set setToken(token: string) {
    localStorage.setItem('token', token);
  }

  successPopup = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Done!',
      showConfirmButton: false,
      timer: 1000,
    });
  };
  errorPopup = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Done!',
      showConfirmButton: false,
      timer: 1000,
    });
  };
}
