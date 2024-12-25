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
export class LoaderComponent implements OnInit{
  loaderUrl?: string;
  isLoading$?: Observable<boolean>;
  constructor(
    private _sharedServ: SharedService,
    private _loaderServ: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.loaderUrl = './assets/img/profile.jpg';
    
  }
  ngOnInit(): void {
    this.isLoading$ = this._loaderServ.isLoading$

  }
}
