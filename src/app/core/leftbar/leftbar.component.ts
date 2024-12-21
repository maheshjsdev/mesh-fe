import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-leftbar',
  standalone: false,

  templateUrl: './leftbar.component.html',
  styleUrl: './leftbar.component.scss',
})
export class LeftbarComponent {
  navItems: any = [
    { icon: 'home', tooltip: 'Practices', route: 'home' },
    { icon: 'assignment', tooltip: 'Invoices', route: 'invoice' },
    { icon: 'person_outline', tooltip: 'user', route: 'user' },
  ];
  constructor(private _router: Router, private _sharedServ: SharedService) {}
  logoutClicked = () => {
    Swal.fire({
      title: 'Do you want to logout ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Done!', '', 'success');
        this._sharedServ.isAuthenticated.next(false);
        this._router.navigateByUrl('/login');
        this._sharedServ.clearLocalStorage();
      }
    });
  };
}
