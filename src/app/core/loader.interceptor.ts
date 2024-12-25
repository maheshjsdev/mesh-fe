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
import { SharedService } from '../shared/shared.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loaderServ: LoaderService, private _sharedServ:SharedService) {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this._sharedServ.currentUser.getToken;
    this._loaderServ.show();
    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq).pipe(
        finalize(() => {
          this._loaderServ.hide();
        })
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => {
          this._loaderServ.hide();
        })
      );
    }
  }
}
