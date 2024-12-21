import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,

  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loaderUrl?: string;
  isLoading1: boolean = false;
  constructor(
    private _sharedServ: SharedService,
    public _loaderServ: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this._loaderServ.isLoading$.subscribe((loading: boolean) => {
      this.isLoading1 = loading;
      console.log(loading);
    });
    this.loaderUrl = './assets/img/profile.jpg';
    console.log('loader is working');
  }
}
