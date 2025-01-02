import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated: boolean = localStorage.getItem('token') ? true : false;
  if (state.url === '/login') {
    if (isAuthenticated) {
      inject(Router).navigateByUrl('/home');
      return false;
    } else {
      return true
    }
  } else {
    if (isAuthenticated) {
      return true;
    } else {
      inject(Router).navigateByUrl('/login');
      return false;
    }
  }
};
