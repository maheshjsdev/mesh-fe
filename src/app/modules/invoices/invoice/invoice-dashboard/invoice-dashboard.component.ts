import { Component } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-invoice-dashboard',
  standalone: false,

  templateUrl: './invoice-dashboard.component.html',
  styleUrl: './invoice-dashboard.component.scss',
})
export class InvoiceDashboardComponent {
  constructor(private _sharedServ: SharedService) {
    this._sharedServ.isAuthenticated.next(true);
  }
}
