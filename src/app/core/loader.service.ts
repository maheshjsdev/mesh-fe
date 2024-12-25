import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loader.asObservable();

  show = (): void => {
    this.loader.next(true);
  }

  hide = (): void => {
    this.loader.next(false);
  }
}
