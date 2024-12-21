import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName?: any;
  email?: any;
  constructor(private _sharedServ: SharedService) {
    this.userName = `${this._sharedServ.currentUser.getFirstName()} ${this._sharedServ.currentUser.getLastName()}` ;
    this.email = this._sharedServ.currentUser.getEmail();
  }
}
