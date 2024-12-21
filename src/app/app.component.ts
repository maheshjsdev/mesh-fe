import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mesh';
  isAuth!: boolean;
  constructor(private _sharedServ: SharedService) {
    this._sharedServ.isAuthenticated.subscribe((res) => {
    this.isAuth = res;
    });
    // this.isAuth = true;
  }
}
