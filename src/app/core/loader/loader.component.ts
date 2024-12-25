import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: false,

  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loaderUrl?: string;
  isLoading: boolean = false;
  constructor(
    private _sharedServ: SharedService,
    private _loaderServ: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.loaderUrl = './assets/img/profile.jpg';
    this._loaderServ.isLoading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
