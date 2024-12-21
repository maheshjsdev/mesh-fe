import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-practice-dashboard',
  standalone: false,

  templateUrl: './practice-dashboard.component.html',
  styleUrl: './practice-dashboard.component.scss',
})
export class PracticeDashboardComponent {
  constructor(private _sharedServ: SharedService) {
    this._sharedServ.isAuthenticated.next(true);
  }
}
