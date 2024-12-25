import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName?: any;
  email?: any;
  constructor(private _sharedServ: SharedService, private _router:Router) {
    this.userName = `${this._sharedServ.currentUser.getFirstName()} ${this._sharedServ.currentUser.getLastName()}` ;
    this.email = this._sharedServ.currentUser.getEmail();
  }

    logoutClicked = () => {
      Swal.fire({
        title: 'Do you want to logout ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this._sharedServ.isAuthenticated.next(false);
          this._router.navigateByUrl('/login');
          this._sharedServ.clearLocalStorage();
          Swal.fire('Done!', '', 'success');
        }
      });
    };
}
