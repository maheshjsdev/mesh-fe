import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public _loaderServ: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isAuthenticated = localStorage.getItem('authMsg') ? true : false;
    this._loaderServ.show();
    if (isAuthenticated) {
      return next.handle(request).pipe(
        finalize(() => {
          this._loaderServ.hide();
          console.log(request)
        })
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {
          console.log('Hide');
          this._loaderServ.hide();
        })
      );
    }
  }
}
