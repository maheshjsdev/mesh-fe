import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { currentUserState } from './userState';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  currentUser = new currentUserState();
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUser.setCurrentUser = user;

    const authMsgValue = localStorage.getItem('authMsg')
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
}
